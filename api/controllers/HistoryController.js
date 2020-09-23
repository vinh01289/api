
const USER_TYPE = require('../constants/UserTypes');
/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
async function validateData(req) {
  const driver = req.body.driver;
  const license_plate = req.body.license_plate;
  const cylinders = req.body.cylinders;
  let from = req.body.from;

  let to = req.body.to;
  const toArray=req.body.toArray;
  const type = req.body.type;
  const userType = req.userInfo.userType;
  let typeForPartner = req.body.typeForPartner;
  let toArrayModel = undefined;
  let toModel = undefined;
  //let fromModel = undefined;

  // FACTORY - GENERAL : EXPORT => toArray
  if (!type) {
    return Utils.jsonErr('Type is required');
  }

  if (type !== 'TURN_BACK' && !from) {
    return Utils.jsonErr('From is required');
  }

  if (type !== 'SALE' && userType !== USER_TYPE.Factory && userType !== USER_TYPE.Fixer && userType !== USER_TYPE.General && !to) {
    return Utils.jsonErr('To is required');
  }

  // if(type === 'GIVE_BACK') {
  //   if(!typeForPartner) {return Utils.jsonErr('typeForPar is requiring when action type is GIVE_BACK');}
  // }
  // if(type=== 'EXPORT' && !!typeForPartner)
  // {

  // }

  // Lấy object user từ from và to
  try {
    toModel = await User.findOne({id: to});
    //fromModel = await User.findOne({id: from});
    toArrayModel = await User.findOne({id: toArray[0]});
  }
  catch (e) {

  }

  if(type === 'EXPORT' && toModel === undefined && toArrayModel === undefined && userType === USER_TYPE.Agency){
    return Utils.jsonErr('Destination to export is missing');
  }
  
  if (!driver && type!=='SALE') {
    return Utils.jsonErr('Driver is required');
  }

  if (!license_plate && type!=='SALE') {
    return Utils.jsonErr('License_plate is required');
  }
  if((type==='EXPORT' || type === 'IMPORT') && !!typeForPartner)
  {
    //validate for sub type here
  }
  else{


    if (!cylinders || cylinders === []) {
      return Utils.jsonErr('Cylinders is required');
    }

    //Check status of Cylinder - Current removed status from system so we don't need to check
    // const emptyCylinders = _.takeWhile(cylinders, cylinder => { return cylinder.status === 'EMPTY';});
    // if(emptyCylinders.length > 0) {
    //   let serials = '';
    //   for(let i = 0; i < emptyCylinders.length; i++) {
    //     if(i !== 0) {serials = serials.concat(';');}
    //     serials = serials.concat(` ${emptyCylinders[i].serial}`);
    //   }

    //   if(type === 'IMPORT' && fromModel.userType !== USER_TYPE.Station) {

    //     return Utils.jsonErr(`Cylinders with serial ${serials} for import cannot empty`);
    //   }

    //   if(type === 'EXPORT' && !(fromModel.userType === USER_TYPE.Factory && toArrayModel.userType === USER_TYPE.Station) && !(fromModel.userType === USER_TYPE.Station && toModel.userType === USER_TYPE.Factory)) {
    //     return Utils.jsonErr(`Cylinders with serial ${serials} for export cannot empty`);
    //   }
    // }
  }

  return null;
}

module.exports = {
  
  sortHistoryImport: async function(req, res){
    let data = await History.find({type : "IMPORT"}).sort({ "createdAt": -1 });
    console.log(data);
    if (data) {
      return res.json({ error: false, data: data });
    }
    else {
      return res.json({ error: true, message: 'huhu' });
    }
  },
  sortHistoryExport: async function(req, res){
    let data = await History.find({type : "EXPORT"}).sort({ "createdAt": -1 });
    console.log(data);
    if (data) {
      return res.json({ error: false, data: data });
    }
    else {
      return res.json({ error: true, message: 'huhu' });
    }
  },
  /**
	 * Action for /history/create
	 * @param email, password, password_confirm
	 * @param res
	 * @returns {*}
	 */
  importCylinder: async function (req, res) {

    if (Object.keys(req.body).length === 0) {
      return res.badRequest(Utils.jsonErr('Empty body'));
    }
    const type = req.body.type;
    // if(type === 'TURN_BACK_NOT_IN_SYSTEM')
    // {
    //   const driver = req.body.driver;
    //   const license_plate = req.body.license_plate;
    //   let to = req.body.to;
    //   let from = null;
    //   let numberOfCylinder = req.body.numberOfCylinder;

    //   // Validate request để đảm bảo params truyền lên đủ yêu cầu
    //   //const error = await validateData(req, toModel, fromModel);
    //   //if (error) {return res.ok(error);}

    //   // Tính tổng amount của những bình truyền lên
    //   let result = await History.create({
    //     driver,
    //     license_plate,
    //     from,
    //     to,
    //     type,
    //     numberOfCylinder,
    //     amount:0
    //   }).fetch();

    //   return res.created(result);

    // }
    // else{
    // const createBy = req.body.idUser
    const driver = req.body.driver;
    const license_plate = req.body.license_plate;
    const cylinders = req.body.cylinders;
    let signature = req.body.signature;
    const idDriver = req.body.idDriver;    
    let typeForPartner = req.body.typeForPartner;
    let from = req.body.from;
    let saler=req.body.saler;

    // Ghi vào bảng CylinderImex
    const {
      cylinderImex,
      idImex,
      typeImex,
      flow,
    } = req.body

    // Kiểm tra input
    // if (cylinderImex.length !== cylinders) {
    //   return res.badRequest(Utils.jsonErr('Danh sách bình trong cylinderImex và cylinders không giống nhau'));
    // }
    // else {
    //   const difference = cylinders.filter(el => !toRemove.includes( el ))
    // }


    const {
      exportByDriver,
      turnbackByDriver
    } = req.body

    let exportPlace;
    let customer = null;

    let to = req.body.to;
    let numberOfCylinder=0;
    let cylindersWithoutSerial = !!req.body.cylindersWithoutSerial ? req.body.cylindersWithoutSerial :  0;
    if(!!req.body.cylinders)
    {
      numberOfCylinder = req.body.cylinders.length;
    }

    if(cylindersWithoutSerial !== 0) {
      numberOfCylinder += cylindersWithoutSerial;
    }

    const numberArray=req.body.numberArray;
    const toArray=req.body.toArray;
    let toModel = undefined;
    let fromModel = undefined;
    // Validate request để đảm bảo params truyền lên đủ yêu cầu
    const error = await validateData(req);
    if(!typeForPartner) {typeForPartner = '';}
    if (error) {return res.ok(error);}

    if (type==='SALE' && (!signature || signature=="" || signature==undefined ) ) {
      signature = 'Bán lẻ cho người dân'
    }

    // if((type=== 'IMPORT' || type==='EXPORT') && !!typeForPartner)
    // {
    //   numberOfCylinder = req.body.numberOfCylinder;
    //   let result = await History.create({
    //     driver,
    //     license_plate,
    //     from,
    //     to,
    //     type,
    //     numberOfCylinder,
    //     typeForPartner
    //   }).fetch();

    //   return res.created(result);
    // }
    //else{

    try {

    

    let newCyLinders=[];
    for(let i =0; i<cylinders.length; i++)
    {
      let itemCylinder = await Cylinder.findOne({id:cylinders[i]}).populate('histories').populate('current');
      if(typeof itemCylinder.histories !== 'undefined' && itemCylinder.histories !==null && itemCylinder.histories.length>0)
      {        
        let final = itemCylinder.histories[itemCylinder.histories.length-1];
        
        try {
          final = await History.findOne(final).populate('toArray');
        } catch (error) {

        }
        if (type === 'EXPORT') {
          if(itemCylinder.current.id===from || itemCylinder.placeStatus === 'IN_FACTORY')
          {
            newCyLinders.push(cylinders[i]);
          }
        }
        else if(type=== 'IMPORT')
        {
          //check lai && (final.to === to||final.toArray.indexOf(to) !==-1)
          if(itemCylinder.placeStatus === 'DELIVERING' && (final.to === to || _.find(final.toArray, o => {return o.id === to;}) !== undefined))
          {
            newCyLinders.push(cylinders[i]);
          }
        }
        // else if(type=== 'GIVE_BACK')
        // {
        //   newCyLinders.push(cylinders[i]);
        // }
        else if(type === 'SALE')
        {
          if(itemCylinder.current.id===from)
          {
            newCyLinders.push(cylinders[i]);
          }
        }
        else if (type==='TURN_BACK')
        {
          //if(itemCylinder.placeStatus==='IN_CUSTOMER'||itemCylinder.placeStatus==='UNKNOW'){
          newCyLinders.push(cylinders[i]);
          //}
        }
      }
      else{
        newCyLinders.push(cylinders[i]);
      }
    }
    console.log('Danh sach binh: ', newCyLinders);
    if(newCyLinders.length !== cylinders.length)
    {
      return res.ok(Utils.jsonErr('Danh sách bình không chính xác!!!'));
    }

    // Tính tổng amount của những bình truyền lên
    let amount = 0;
    /*amount=await Cylinder.sum('currentSalePrice').where({_id: {in: cylinders}})*/
    try {
      const saledCylinders = await Cylinder.find({id : newCyLinders});
      for(let i = 0; i < saledCylinders.length; i++) {
        amount = amount + Number(saledCylinders[i].currentSalePrice !== 0 ? saledCylinders[i].currentSalePrice : saledCylinders[i].currentImportPrice);
      }
    } catch (error) {
      amount = 0;
    }

    // try {
      let result = await History.create({
        driver,
        license_plate,
        cylinders,
        signature,
        idDriver,
        from,
        to,
        type,
        toArray,
        numberArray,
        numberOfCylinder,
        cylindersWithoutSerial,
        amount,
        saler,
        typeForPartner,
        exportByDriver,
        turnbackByDriver,
        createdBy: req.userInfo.id,
      }).fetch();

    // }
    // catch(err) {
    //   return res.ok(Utils.jsonErr(err.message)); 
    // }

    // Kiểm tra from to và type của history để set placeStatus
    let placeStatus = 'IN_FACTORY';
    let current = null;
    let status = 'EMPTY';
    let pushGas=false;

    try {
      toModel = await User.findOne({id: to});
      if (type !== 'TURN_BACK' && !!from) {
        fromModel = await User.findOne({id: from});
      }

    }
    catch (e) {

    }

    if (type === 'EXPORT') {
      placeStatus = 'DELIVERING';
      current = from;
      if(typeForPartner === '' && fromModel.userType === USER_TYPE.Factory) {exportPlace = from;}
    }

    if (type === 'IMPORT') {
      if (toModel.userType === USER_TYPE.Factory) {placeStatus = 'IN_FACTORY';}
      if (toModel.userType === USER_TYPE.Fixer) {placeStatus = 'IN_REPAIR';}
      if (toModel.userType === USER_TYPE.General) {placeStatus = 'IN_GENERAL';}
      if (toModel.userType === USER_TYPE.Agency) {placeStatus = 'IN_AGENCY';}
      current = to;
    }
    // if (type === 'GIVE_BACK') { // Trả về cho nhà máy
    //   placeStatus = 'DELIVERING';
    //   current = from;
    // }
    if (type === 'TURN_BACK') { // Nhà máy nhận bình trả về
      if (toModel.userType === 'Factory') {
        placeStatus = 'IN_FACTORY';
        //status = 'EMPTY';
        //pushGas=true;
      }
      current = to;
    }
    if (type === 'SALE') {
      /*if (toModel.userType === 'Normal') placeStatus = 'IN_CUSTOMER'
        current = to*/
      placeStatus = 'IN_CUSTOMER';
      current = from;
      if(!req.body.nameCustomer || !req.body.addressCustomer || req.body.nameCustomer === '' || req.body.addressCustomer === '') {return req.badRequest('Missing customer infomation');}
      let form = {
        name: req.body.nameCustomer,
        address: req.body.addressCustomer,
        phone: req.body.phoneCustomer,
        owner: req.userInfo.id
      };
      try{
        customer = await Customer.findOrCreate({phone: req.body.phoneCustomer, owner: req.userInfo.id}, form);
        if(customer) {
          result = await History.updateOne({_id: result.id})
            .set({customer: customer.id,saler:req.userInfo.id}).fetch();
        }
      }
      catch (e) {
        console.log('Error::::', e);
      }

    }

    // Kiểm tra from to và type của history để set trạng thái đủ gas hay chưa
    // if (type === 'EXPORT' && fromModel !== null && fromModel.userType === 'Station') {
    //   status = 'FULL';
    //   pushGas=true;
    //   console.log("vao");
    // }

    //Check exportPlace

    let updateForm = {
      placeStatus: placeStatus,
      current: current,
      //updateBy: idUser
    };

    if(exportPlace) {
      updateForm.exportPlace = exportPlace;
    }

    if (!result) {return res.ok(Utils.jsonErr(result.err));}
    let resultUpdated =null;
    // Update placeStatus của những bình truyền lên
    if(pushGas) { updateForm.status = status;}
    resultUpdated = await Cylinder.update({_id: {in: cylinders}})
                  .set(updateForm)
                  .fetch();

    if (!resultUpdated) {return res.ok(Utils.jsonErr(result.err));} 

    // returnGas
    if (type === 'TURN_BACK') {
      let { cylindersReturn, createBy } = req.body;

      if (cylindersReturn) {
        const dateReceived = Date();
        const length_returnGas = cylindersReturn.length
        let data_returnGas = []

        if (length_returnGas > 0) {
          for (let i = 0; i < length_returnGas; i++) {
            data_returnGas[i] = await returnGas.create({
              serialCylinder: cylindersReturn[i].serial,
              idCylinder: cylindersReturn[i].id,
              dateReceived: dateReceived,
              weight: cylindersReturn[i].weight,
              //idCompany: createBy,
              //createBy: createBy
            }).fetch();
          }

          console.log("data_returnGas_mobile", data_returnGas);

          // return res.json({ error: false, data: data });
        }

      }
      else {
        const dateReceived = Date();
        const length_returnGas = cylinders.length
        let data_returnGas = []
        try {
          if (length_returnGas > 0) {
            
            for (let i = 0; i < length_returnGas; i++) {
              let cylWeight = await Cylinder.findOne({ id: cylinders[i]})
              console.log('cylWeight.weight', cylWeight.weight)
              data_returnGas[i] = await returnGas.create({
                serialCylinder: cylWeight.serial,
                idCylinder: cylWeight.id,
                dateReceived: dateReceived,
                weight: cylWeight.weight,
                //idCompany: createBy,
                //createBy: createBy
              }).fetch();
            }
  
            console.log("data_returnGas_web", data_returnGas);
  
            // return res.json({ error: false, data: data });
          }

        }catch (err) {
          return res.created('err_messaga', err.message);

        }
        
        
      }


      
      // else {
      //   return res.json({ error: true, message: 'Khong co binh nao' });
      // }
    }

    // Sau khi ghi vào bảng History và cập nhật lại trạng thái bình thành công
    // Ghi tiếp vào bảng CylinderImex
    if (typeImex) {
      await Promise.all(cylinderImex.map(async cylinder => {
        let condition = ''
        if (!cylinder.condition) {
          const record = await CylinderImex.find({
            cylinder: cylinder.id
          }).sort('createdAt DESC')

          if (record.length > 0) {
            condition = record[0].condition
          }
          else {
            condition = 'NEW'
          }
        }

        const cylinderInfo = await Cylinder.findOne({id: cylinder.id})        

        await CylinderImex.create({
          cylinder: cylinder.id,
          status: cylinder.status ? cylinder.status : 'FULL' ,
          condition: cylinder.condition ? cylinder.condition.toUpperCase() : condition,
          idImex: idImex ? idImex : Date.now(),
          typeImex: typeImex,
          flow: flow,
          category: cylinderInfo ? cylinderInfo.category : null,
          createdBy: req.userInfo.id,
          objectId: req.userInfo.id,
          history: result.id,
        })
      }))
    }

    return res.created(result);
    //}
    }
    catch (error) {
      return res.badRequest(Utils.jsonErr(error.message));
    }
  },

  importCylinderSkipScanWhenExport: async function (req, res) {
    if (!req.body) {
      return res.ok(Utils.jsonErr('Empty body'));
    }

    const {
      driver,
      license_plate,
      // from,
      // toArray,
      //to,
      // cylindersWithoutSerial,
      type,
      cylinders,
      typeForPartner,
      //numberArray,
      idDriver,
      //signature,
      userId
    } = req.body
    //let cylindersWithoutSerial = !!req.body.cylindersWithoutSerial ? req.body.cylindersWithoutSerial :  0;

    if (!type) {
      return Utils.jsonErr('Type is required');
    }
    if (type !== 'IMPORT_SKIP_EXPORT') {
      return Utils.jsonErr('Wrong aciton type');
    }
    // if (type !== 'TURN_BACK' && !from) {
    //   return Utils.jsonErr('From is required');
    // }
    if (!cylinders || cylinders === []) {
      return Utils.jsonErr('Cylinders is required');
    }
    if (!driver && type!=='SALE') {
      return Utils.jsonErr('Driver is required');
    }  
    if (!license_plate && type!=='SALE') {
      return Utils.jsonErr('License_plate is required');
    }

    let dataExport = {}
    let dataImport = {}

    try {
      // Tìm vị trí hiện tại của cylinder
      let currentLocationCylinder = await Cylinder.findOne({id: cylinders[0]}).populate('current')

      dataExport.driver = driver
      dataExport.license_plate = license_plate
      dataExport.from = currentLocationCylinder.current.id
      dataExport.toArray = [userId]
      // dataExport.cylindersWithoutSerial = null
      dataExport.type = 'EXPORT'
      dataExport.cylinders = cylinders
      dataExport.typeForPartner = typeForPartner
      dataExport.numberArray = [(cylinders.length).toString()]
      dataExport.idDriver = idDriver
      dataExport.signature = 'Web signature - IMPORT_SKIP_EXPORT'

      let resultExport = await History.create(dataExport).fetch();

      if (resultExport && resultExport.hasOwnProperty('type') && resultExport.type) {
        dataImport.driver = driver
        dataImport.license_plate = license_plate
        dataImport.from = resultExport.from
        dataImport.to = userId
        // dataImport.cylindersWithoutSerial = null
        dataImport.type = 'IMPORT'
        dataImport.cylinders = cylinders
        dataImport.typeForPartner = typeForPartner
        //dataImport.numberArray = [(cylinders.length).toString()]
        dataImport.idDriver = idDriver
        dataImport.signature = 'Web signature - IMPORT_SKIP_EXPORT'

        let resultImport = await History.create(dataImport).fetch();

        if (resultImport && resultImport.hasOwnProperty('type') && resultImport.type) {
          //update lại trạng thái, vị trí của cylinder
          let userInfo = await User.findOne({id: userId})
          let updateForm = {
            placeStatus: 'IN_' + userInfo.userType.toUpperCase(),
            current: userInfo.id,
            exportPlace: currentLocationCylinder.current.id
          }

          resultUpdated = await Cylinder.update({_id: {in: cylinders}})
                  .set(updateForm)
                  .fetch();

          if (resultUpdated) {
            return res.json({ status: true, message: 'Nhập hàng thành công'});
          }
          else {
            return res.json({ status: false, message: 'Tạo thành công bản ghi xuất hàng và nhập hàng, nhưung bị lỗi cập nhật lại thông tin trạng thái bình'});
          }          
        }
        else {
          return res.json({ status: false, message: 'Không tạo được bản ghi nhập hàng'});
        }
      }
      else {
        return res.json({ status: false, message: 'Không tạo được bản ghi xuất hàng'});
      }
    }
    catch (error) {
      return res.json({ status: false, data: error.message, message: 'Gặp lỗi khi nhập hàng (mà không có bản ghi xuất hàng)'});
    }
  }
};
