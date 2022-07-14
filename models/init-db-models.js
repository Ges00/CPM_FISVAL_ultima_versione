let DataTypes = require("sequelize").DataTypes;


// tabella utilità SERVE ANCORA?
// let _VendorService = require('./VendorService');

//asset perspective
let _Resource = require('./asset_perspective/resource');
let _WorkCenterGroup = require('./asset_perspective/work_center_group');
let _WorkCenter = require('./asset_perspective/work_center');

// process perspective
let _Client = require('./process_perspective/client');
let _ConfigurationParameter = require('./process_perspective/configuration_parameter');
let _ContractWorkOrderWarning = require('./process_perspective/contract_work_order_warning');
let _ContractWorkOrder = require('./process_perspective/contract_work_order');
let _ProductionOrder = require('./process_perspective/production_order');
let _ProductionPhaseExecution = require('./process_perspective/production_phase_execution');
let _ProductionPhase = require('./process_perspective/production_phase');
let _PurchaseOrderItem = require('./process_perspective/purchase_order_item');
let _PurchaseOrderWarning = require('./process_perspective/purchase_order_warning');
let _PurchaseOrder = require('./process_perspective/purchase_order');
let _SalesOrderItem = require('./process_perspective/sales_order_item');
let _SalesOrder = require('./process_perspective/sales_order');
let _Service = require('./process_perspective/service');
let _Supplier = require('./process_perspective/supplier');

//product perspective
let _EbomPartcode = require('./product_perspective/ebom_partcode');
let _Ebom = require('./product_perspective/ebom');
let _MbomPartcode = require('./product_perspective/mbom_partcode');
let _Mbom = require('./product_perspective/mbom');
let _Product = require('./product_perspective/product');



function initModels(sequelize){
    //let ClientDetails = _ClientDetails(sequelize, DataTypes);

    let Resource = _Resource(sequelize, DataTypes);
    let WorkCenterGroup = _WorkCenterGroup(sequelize, DataTypes);
    let WorkCenter = _WorkCenter(sequelize, DataTypes);
    let Client = _Client(sequelize, DataTypes);
    let ConfigurationParameter = _ConfigurationParameter(sequelize, DataTypes);
    let ContractWorkOrderWarning = _ContractWorkOrderWarning(sequelize, DataTypes);
    let ContractWorkOrder = _ContractWorkOrder(sequelize, DataTypes);
    let ProductionOrder = _ProductionOrder(sequelize, DataTypes);
    let ProductionPhaseExecution = _ProductionPhaseExecution(sequelize, DataTypes);
    let ProductionPhase = _ProductionPhase(sequelize, DataTypes);
    let PurchaseOrderItem = _PurchaseOrderItem(sequelize, DataTypes);
    let PurchaseOrderWarning = _PurchaseOrderWarning(sequelize, DataTypes);
    let PurchaseOrder = _PurchaseOrder(sequelize, DataTypes);
    let SalesOrderItem = _SalesOrderItem(sequelize, DataTypes);
    let SalesOrder = _SalesOrder(sequelize, DataTypes);
    let Service = _Service(sequelize, DataTypes);
    let Supplier = _Supplier(sequelize, DataTypes);
    let EbomPartcode = _EbomPartcode(sequelize, DataTypes);
    let Ebom = _Ebom(sequelize, DataTypes);
    let MbomPartcode = _MbomPartcode(sequelize, DataTypes);
    let Mbom = _Mbom(sequelize, DataTypes);
    let Product = _Product(sequelize, DataTypes);


    Product.hasOne(Ebom, { foreignKey: "product_id"});
    Product.hasMany(Mbom, { foreignKey: "product_id"});
    Product.hasMany(SalesOrderItem, { foreignKey: "product_id"});

    Ebom.belongsTo(Product, { foreignKey: "product_id"});
    Ebom.hasMany(EbomPartcode, { foreignKey: "ebom_id"});

    EbomPartcode.belongsTo(Ebom, { foreignKey: "ebom_id"});
    EbomPartcode.hasMany(MbomPartcode, { foreignKey: "mbom_partcode_id"}); // ????????????

    Mbom.belongsTo(Product, { foreignKey: "product_id"});
    Mbom.hasMany(MbomPartcode, { foreignKey: "mbom_id"});

    MbomPartcode.belongsTo(Mbom, { foreignKey: "mbom_id"});
    MbomPartcode.hasMany(MbomPartcode, { foreignKey: "mbom_partcode_id"});
    MbomPartcode.belongsTo(MbomPartcode, { foreignKey: "parent_partcode_id"});
    MbomPartcode.hasMany(EbomPartcode, { foreignKey: "mbom_partcode_id"}); // ????????????
    MbomPartcode.hasMany(ProductionOrder, { foreignKey: "mbom_partcode_id"});
    MbomPartcode.hasMany(PurchaseOrderItem, { foreignKey: "mbom_partcode_id"});

    Client.hasMany(SalesOrder, { foreignKey: "client_id"});
    Client.hasMany(ProductionOrder, { foreignKey: "client_id"});

    SalesOrder.belongsTo(Client, { foreignKey: "client_id"});
    SalesOrder.hasMany(SalesOrderItem, { foreignKey: "sales_order_id"});

    SalesOrderItem.belongsTo(Product, { foreignKey: "product_id"});
    SalesOrderItem.belongsTo(SalesOrder, { foreignKey: "sales_order_id"});

    ProductionOrder.belongsTo(MbomPartcode, { foreignKey: "mbom_partcode_id"});
    ProductionOrder.hasMany(ProductionPhase, { foreignKey: "production_order_id"});
    ProductionOrder.belongsTo(Client, { foreignKey: "client_id"});

    ProductionPhase.belongsTo(ProductionOrder, { foreignKey: "production_order_id"});
    ProductionOrder.belongsTo(ProductionPhase, { foreignKey: "parent_production_phase_id"});
    ProductionOrder.hasMany(ProductionPhase, { foreignKey: "production_order_id"});
    ProductionPhase.hasOne(ProductionPhaseExecution, { foreignKey: "production_phase_id"});
    ProductionPhase.belongsTo(WorkCenterGroup, { foreignKey: "work_center_group_id"});

    ProductionPhaseExecution.belongsTo(ProductionPhase, { foreignKey: "production_phase_id"});
    ProductionPhaseExecution.hasOne(ContractWorkOrder, { foreignKey: "production_phase_execution_id"});
    ProductionPhaseExecution.belongsTo(WorkCenter, { foreignKey: "work_center_id"});

    ContractWorkOrder.belongsTo(Supplier, { foreignKey: "supplier_id"});
    ContractWorkOrder.belongsTo(ProductionPhaseExecution, { foreignKey: "production_phase_execution_id"});
    ContractWorkOrder.hasMany(ContractWorkOrderWarning, { foreignKey: "contract_work_order_id"});

    PurchaseOrder.belongsTo(Supplier, { foreignKey: "supplier_id"});
    PurchaseOrder.hasMany(PurchaseOrderItem, { foreignKey: "purchase_order_id"});
    PurchaseOrder.hasMany(PurchaseOrderWarning, { foreignKey: "purchase_order_id"});

    PurchaseOrderItem.belongsTo(PurchaseOrder, { foreignKey: "purchase_order_id"});
    PurchaseOrderItem.belongsTo(MbomPartcode, { foreignKey: "mbom_partcode_id"});

    Supplier.hasMany(ContractWorkOrder, { foreignKey: "supplier_id"});
    Supplier.hasMany(PurchaseOrder, { foreignKey: "supplier_id"});
    Supplier.hasMany(Service, { foreignKey: "supplier_id"});

    Service.belongsTo(Supplier, { foreignKey: "supplier_id" });

    ContractWorkOrderWarning.belongsTo(ContractWorkOrder, { foreignKey: "contract_work_order_id" });

    PurchaseOrderWarning.belongsTo(PurchaseOrder, { foreignKey: "purchase_order_id" });

    // configuration parameter

    WorkCenterGroup.hasMany(WorkCenter, { foreignKey: "work_center_group_id"});
    WorkCenterGroup.hasMany(ProductionPhase, { foreignKey: "work_center_group_id"});

    WorkCenter.belongsTo(WorkCenterGroup, { foreignKey: "work_center_group_id"});
    WorkCenter.belongsTo(WorkCenter, { foreignKey: "parent_work_center_id"});
    WorkCenter.hasMany(WorkCenter, { foreignKey: "parent_work_center_id"}); // ??????
    WorkCenter.hasMany(Resource, { foreignKey: "work_center_id"});
    WorkCenter.hasMany(ProductionPhaseExecution, { foreignKey: "work_center_id"});

    Resource.belongsTo(WorkCenter, { foreignKey: "work_center_id"});

    return {
        Resource,
        WorkCenterGroup,
        WorkCenter,
        Client,
        ConfigurationParameter,
        ContractWorkOrderWarning,
        ContractWorkOrder,
        ProductionOrder,
        ProductionPhaseExecution,
        ProductionPhase,
        PurchaseOrderItem,
        PurchaseOrderWarning,
        PurchaseOrder,
        SalesOrderItem,
        SalesOrder,
        Service,
        Supplier,
        EbomPartcode,
        Ebom,
        MbomPartcode,
        Mbom,
        Product
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;




