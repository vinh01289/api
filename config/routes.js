/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },

  /***************************************************************************
     *                                                                          *
     * More custom routes here...                                               *
     * (See https://sailsjs.com/config/routes for examples.)                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the routes in this file, it   *
     * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
     * not match any of those, it is matched against static assets.             *
     *                                                                          *
     ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


  //UserType controller
  '/POST /userType/createUserType': 'UserTypeController.createUserType',
  'POST /userType/updateUserType': 'UserTypeController.updateUserType',
  'POST /userType/deleteUserType': 'UserTypeController.deleteUserType',
  'POST /userType/getAllUserType': 'UserTypeController.getAllUserType',
  'POST /userType/getUserTypeById': 'UserTypeController.getUserTypeById',

  // User Controler
  '/me': 'UserController.me',
  'GET /user/info': 'UserController.info',
  'POST /user/addUser': 'UserController.addUser',
  'POST /user/getInforById': 'UserController.getInforById',

  // Cuong
  '/user/forgot': 'UserController.forgotPassword',
  '/user/reset_password': 'UserController.resetPasswordByResetToken',
  'POST /user/change_password': 'UserController.changePassword',
  'POST /user/getAllChild': 'UserController.getAllChild',


  'GET /user/getDestination': 'UserController.getDestination',
  'GET /user/getAllFactory': 'UserController.getAllFactory',
  'GET /user/getReportChilds': 'UserController.getReportChilds',
  'POST /user/updateChild': 'UserController.updateChild',
  'POST /user/getAllCompanyToFix': 'UserController.getAllCompanyToFix',
  'POST /cylinder/searchCylinders': 'CylinderController.searchCylinders',
  'POST /cylinder/createReqImport': 'CylinderController.createReqImport',
  'POST /cylinder/getReqImport': 'CylinderController.getReqImport',
  'POST /cylinder/confirmReqImport': 'CylinderController.confirmReqImport',
  'POST /cylinder/removeReqImport': 'CylinderController.removeReqImport',
  'GET /user/getListUserByTpe': 'UserController.getListUserByTpe',
  'POST /cylinder/importCylinders': 'CylinderController.importCylinders',
  'GET /manufacture/listManufactures': 'ManufactureController.listManufactures',
  'GET /category/listCategories': 'CategoryCylinderController.listCategories',

  // hieu
  //'POST /user/uploadFile' : 'UserController.uploadFile',
  'POST /user/updateInformationUser': 'UserController.updateInformationUser',
  'POST /returnGas': 'UserController.returnGasS',
  'POST /updateReturnGas': 'UserController.updateReturnGas',
  'GET /getListReturnGas': 'UserController.getListReturnGas',
  'POST /getBrandInformation': 'UserController.getBrandInformation',

  'POST /user/getAvatar': 'UserController.getAvatar',
  'POST /user/getDriver': 'UserController.getDriver',
  'POST /user/getDriverImport': 'UserController.getDriverImport',
  'POST /user/listNameDriver': 'UserController.listNameDriver',
  'POST /user/getSignature': 'UserController.getSignature',

  // Cylinder Controllers
  /*'/cylinder': 'CylinderController.index',*/
  'POST /cylinder/import': 'CylinderController.import',
  'POST /cylinder/update_place_status': 'CylinderController.upPlaceStatus',
  'POST /cylinder/create': 'CylinderController.create',
  'POST /cylinder/getInfomation': 'CylinderController.getInfomation',
  'POST /cylinder/updateCylinder': 'CylinderController.updateCylinder',
  'GET /cylinder/searchCylinder': 'CylinderController.searchCylinder',
  'POST /cylinder/updateVerifiedDates': 'CylinderController.updateVerifiedDates',
  'POST /cylinder/getInfomationExcel': 'CylinderController.getInfomationExcel',
  'POST /cylinder/updateCylinderInformationExcel': 'CylinderController.updateCylinderInformationExcel',
  'POST /cylinder/importFromSubsidiary': 'CylinderController.importFromSubsidiary',


  // History Controllers
  'POST /history/importCylinder': 'HistoryController.importCylinder',
  'GET /history/sortHistoryImport': 'HistoryController.sortHistoryImport',
  'GET /history/sortHistoryExport': 'HistoryController.sortHistoryExport',
  // 'GET /history/sortHistoryImport10': 'HistoryController.sortHistoryImport10',
  // 'GET /history/sortHistoryExport10': 'HistoryController.sortHistoryExport10',
  'POST /history/importCylinderSkipScanWhenExport': 'HistoryController.importCylinderSkipScanWhenExport',


  // Manufature Controllers
  'POST /manufacture/create': 'ManufactureController.create',
  'GET /manufacture/find': 'ManufactureController.find',
  'GET /manufacture/list': 'ManufactureController.list',
  'POST /manufacture/updateBrandInformation': 'ManufactureController.updateBrandInformation',
  'POST /manufacture/listManufacture': 'ManufactureController.listManufacture',

  //Report Controllers
  'POST /report/reportCylinder': 'ReportController.reportCylinder',
  'GET /report/getCustomers': 'ReportController.getCustomers',
  'POST /report/getCustomerReport': 'ReportController.getCustomerReport',
  'POST /report/getReportFilters': 'ReportController.getReportFilters',
  'POST /report/reportChartData': 'ReportController.reportChartData',
  'GET /report/getInventoryInfo': 'ReportController.getInventoryInfo',
  'POST /report/getTurnBackCylinders': 'ReportController.getTurnBackCylinders',
  'POST /report/getTurnBackInfo': 'ReportController.getTurnBackInfo',
  'POST /report/getChildAndNumberImportByDateTime:': 'ReportController.getChildAndNumberImportByDateTime',
  'GET /report/getCylinderHistoryExcels': 'ReportController.getCylinderExcels',
  'POST /report/getReportExcels': 'ReportController.getReportExcels',
  'POST /report/getTopExport': 'ReportController.getTopExport',


  // hieu
  // 'POST /report/checkInventory': 'ReportController.checkInventory',
  'POST /report/getListChild': 'ReportController.getListChild',


  //Price History
  'GET /priceHistory': 'PriceHistoryController.getHistoryPrice',

  //Partner Controller
  'POST /partner/relationship': 'PartnerController.createRelationship',
  'GET /partner/relationship': 'PartnerController.getListRelationship',
  'GET /partner/getFixersRelationship': 'PartnerController.getAllFixerInRelationship',
  'POST /partner/getAllFixerM': 'PartnerController.getAllFixerM',

  //ExportPlace Controller
  //'/exportPlace': 'ExportPlaceController'

  // Inspector
  'POST /inspector/checklist': 'ChecklistController.setChecklist',
  'POST /inspector/setMonthlyChecklist': 'ChecklistController.setMonthlyChecklist',
  'POST /inspector/getInspector': 'UserController.getInspector',
  'POST /inspector/getStaff': 'UserController.getStaff',
  'POST /inspector/getListSchedule': 'InspectionScheduleController.getListSchedule',

  // 
  'POST /schedule/createSchedule': 'InspectionScheduleController.createSchedule',
  'POST /schedule/getSchedule': 'InspectionScheduleController.getSchedule',
  'POST /schedule/getListSchedule': 'InspectionScheduleController.getListSchedule',

  // Order
  'POST /order/setOrder': 'OrderController.setOrder',
  'POST /order/getOrders': 'OrderController.getOrders',
  'POST /order/getOrdersOfFactory': 'OrderController.getOrdersOfFactory',
  'POST /order/changeOrderStatus': 'OrderController.changeOrderStatus',


  // Test  
  'POST /test/getAllHistoryOfCylinder': 'TestController.getAllHistoryOfCylinder',
  'POST /test/getHistoryByID': 'TestController.getHistoryByID',
  'POST /test/Test': 'CylinderImexController.Test',

  // RentalPartners  
  'POST /rentalPartners/createRentalPartners': 'RentalPartnersController.createRentalPartners',

  // CategoryCylinder
  'POST /categoryCylinder/create': 'CategoryCylinderController.create',
  'GET /categoryCylinder/list': 'CategoryCylinderController.list',

  // CylinderCancel
  'POST /cylinderCancel/create': 'CylinderCancel.create',

  // CylinderImex
  'GET /imex/getExport': 'CylinderImexController.getExport',
  'GET /imex/getCurrentInventory': 'CylinderImexController.getCurrentInventory',
  'GET /imex/getStatistics': 'CylinderImexController.getStatistics',

  // Region Company
  'POST /regionCompany/createRegion': 'UserController.createRegion',
  'GET /regionCompany/getListRegion': 'UserController.getListRegion',

  // Station
  'POST /station/createStation': 'UserController.createStation',
  'GET /station/getListStation': 'UserController.getListStation',

  // Customer
  'POST /customer/info': 'CustomerController.createInfo',
  'POST /customer/update': 'CustomerController.updateAddress',
  'POST /customer/checkCustomerIsExist': 'CustomerController.checkCustomerIsExist',



  // Region
  'POST /region/create': 'RegionController.createRegion',
  'GET /region/getAllRegion': 'RegionController.getAllRegion',

  // PriceCategoryCylinder
  'POST /price/create': 'PriceCategoryCylinderController.createPrice',
  'POST /price/getPriceByID': 'PriceCategoryCylinderController.getPriceByID',
  'POST /price/getPriceByRegionID': 'PriceCategoryCylinderController.getPriceByRegionID',
  'POST /price/getPriceByCategoryCylinderID': 'PriceCategoryCylinderController.getPriceByCategoryCylinderID',
  'GET /price/getAllPrice': 'PriceCategoryCylinderController.getAllPrice',
  'POST /price/updatePrice': 'PriceCategoryCylinderController.updatePrice',
  'POST /price/getPriceLatest': 'PriceCategoryCylinderController.getPriceLatest',

  // Order Gas
  'POST /ordergas/create': 'OrderGasController.createOrder',
  'POST /ordergas/getProductOfOrder': 'OrderGasController.getProductOfOrder',
  'POST /ordergas/changeOrderStatus': 'OrderGasController.changeOrderStatus',
  'POST /ordergas/getOrderOfCustomer': 'OrderGasController.getOrderOfCustomer',
  'POST /ordergas/destroyOrder': 'OrderGasController.destroyOrder',

  // Notification
  'POST /notification/create': 'NotificationController.createNotification',
  'POST /notification/getNotificationById': 'NotificationController.getNotificationById',
  'POST /notification/getNotificationOfCustomer': 'NotificationController.getNotificationOfCustomer',

  // Order Gas Truck
  'POST /ordergastruck/create': 'OrderGasTruckController.createOrder',
  'POST /ordergastruck/changeOrderStatus': 'OrderGasTruckController.changeOrderStatus',
  'POST /ordergastruck/getOrderOfUser': 'OrderGasTruckController.getOrderOfUser',
  'POST /ordergastruck/getOrderOfUserCreate': 'OrderGasTruckController.getOrderOfUserCreate',
  'POST /ordergastruck/destroyOrder': 'OrderGasTruckController.destroyOrder',

  // Product Type GEO
  'GET /geo/getAllProductTypeGEO': 'ProductTypeGEOController.getAllProductTypeGEO',
  'POST /geo/createProductTypeGEO': 'ProductTypeGEOController.createProductTypeGEO',

  // Carrier
  'POST /carrier/createCarrier': 'CarrierController.createCarrier',
  'POST /carrier/getCarrierById': 'CarrierController.getCarrierById',
  'GET /carrier/getAllCarrier': 'CarrierController.getAllCarrier',
  'POST /carrier/updateCarrier': 'CarrierController.updateCarrier',
  'POST /carrier/cancelCarrier': 'CarrierController.cancelCarrier',
  'POST /carrier/getCarrierByUserId': 'CarrierController.getCarrierByUserId',


  // TransInvoice
  'POST /transinvoice/createTransInvoice': 'TransInvoiceController.createTransInvoice',
  'POST /transinvoice/getTransInvoiceById': 'TransInvoiceController.getTransInvoiceById',
  'GET /transinvoice/getAllTransInvoiceOfCarrier': 'TransInvoiceController.getAllTransInvoiceOfCarrier',
  'POST /transinvoice/updateTransInvoice': 'TransInvoiceController.updateTransInvoice',
  'POST /transinvoice/cancelTransInvoice': 'TransInvoiceController.cancelTransInvoice',

  // TransInvoiceDetail
  'POST /transinvoicedetail/updateTransInvoiceDetail': 'TransInvoiceDetailController.updateTransInvoiceDetail',
  'POST /transinvoicedetail/getDetailOfTransInvoice': 'TransInvoiceDetailController.getDetailOfTransInvoice',
  'POST /transinvoicedetail/cancelTransInvoiceDetail': 'TransInvoiceDetailController.cancelTransInvoiceDetail',

  // TransLocationInvoice
  'POST /translocationinvoice/createTransLocationInvoice': 'TransLocationInvoiceController.createTransLocationInvoice',
  //'POST /translocationinvoice/getTransLocationInvoiceById': 'TransLocationInvoiceController.getTransLocationInvoiceById',
  //'GET /translocationinvoice/getAllTransLocationInvoice': 'TransLocationInvoiceController.getAllTransLocationInvoice',
  //'POST /translocationinvoice/getLocationByOrderGasId': 'TransLocationInvoiceController.getLocationByOrderGasId',
  'GET /translocationinvoice/getLocationBytransInvoiceDetailId': 'TransLocationInvoiceController.getLocationBytransInvoiceDetailId',
  
  //Phu
  //System User
  'POST /systemuser/createSystemUser' : 'SystemUserController.createSystemUser',
  'GET /systemuser/getAllSystemUser' : 'SystemUserController.getAllSystemUser',
  'POST /systemuser/updateSystemUser' : 'SystemUserController.updateSystemUser',
  'POST /systemuser/deleteSystemUser' : 'SystemUserController.deleteSystemUser'
  // CylinderGas
  // 'POST /cylindergas/searchCylinders': 'CylinderGasController.searchCylinders',
  // 'POST /cylindergas/create': 'CylinderGasController.create',
  // 'POST /cylindergas/getInfomation': 'CylinderGasController.getInfomation',
  // 'POST /cylindergas/updateCylinder': 'CylinderGasController.updateCylinder',
  // 'GET /cylindergas/searchCylinder': 'CylinderGasController.searchCylinder',




};
