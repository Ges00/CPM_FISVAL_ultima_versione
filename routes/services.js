const express = require('express')
var bodyParser = require("body-parser");
const axios = require('axios')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }));

let db = require("../models");
db.sequelize.sync()

// services home
router.get("/", (req, res) => {
    console.log("services home")
        // rendering home.ejs
    res.render('home', { text: 'welcome to services' })
})

// aggiungere un record per ogni entità del modello dati che i parametri
// non possono essere nulli
router.get("/initDB", (req, res) => {
    db.sequelize
        .sync()
        .then(function() {
            db.Product.create({
                id: 1,
                code: "1A",
                description: "primo prodotto di test"
            })
        })
        .then(function() {
            db.Ebom.create({
                id: 1,
                product_id: 1
            })
        })
        .then(function() {
            db.EbomPartcode.create({
                id: 1,
                ebom_id: 1
            })
        })
        .then(function() {
            db.Mbom.create({
                id: 1,
                product_id: 1,
                project_code: "project test",
                approved_by: "approved test",
                last_update: new Date,
                mod_from: "mod test"
            })
        })
        .then(function() {
            db.PartcodeMbom.create({
                id: 1,
                mbom_id: 1,
                M_b: "mb",
                level: "level test",
                pos: "pos test",
                um: "um test",
                qty: 10,
                description: "partcode mbom test",
                Fan: "fan test"
            })
        })
        .then(function() {
            db.Client.create({
                id: 1,
                nome: "client test"
            })
        })
        .then(function() {
            db.SalesOrder.create({
                id: 1,
                client_id: 1,
                date: new Date
            })
        })
        .then(function() {
            db.SalesOrderItem.create({
                id: 1,
                product_id: 1,
                sales_order_id: 1
            })
        })
        .then(function() {
            db.ProductionOrder.create({
                id: 1,
                client_id: 1,
                mbom_partcode_id: 1,
                year: 2000,
                odp_code: "odp code test",
                odp_name: "odp name test",
                qty: 11,
                odp_status: 3
            })
        })
        .then(() => {
            res.send("insertion of data in the database finished sucessfully")
        })
})

// simula il servizio del fornitore che restituisce l'arrival date, funziona in coppia con notifyProductionOrder
router.post("/fornitore", (req, res) => {
    console.log("--------------------------------")
    res.json({
        "arrivalDate": "2022-03-02T00:00:00+01:00"
    })
})

// prende in input il production order, effettua una query al db per reperire l'url del fornitore che 
// restituisce la nuova arrivalDate. questa viene inserita nel json del production order e questo viene salvato nel db
// TO DO
router.post("/notifyProductionOrder", (req, res) => {

    vendorName = req.body["phase1"][10]
    let ResultArrivalDate

    db.VendorService.findAll({
            where: {
                vendorname: vendorName
            },
        })
        .then((attr) => {
            // capire come identificare l'url del servizio del fornitore
            // da cui recuperare i dati necessari per aggiornare la schedulazione
            let serviceUrl = attr[0].serviceurl

            console.log("AXIOS POST REQUEST")
            axios.post(serviceUrl, {
                    prodId: "ODP0004706",
                    itemId: "DSI004919",
                    itemName: "CYLINDER PIN",
                    qtySched: 4.0000000000000000,
                    projectDeliveryDate: "2045-12-31T00:00:00+01:00",
                })
                .then(res => {
                    console.log("inside axios " + res.body)
                })
                //ResultArrivalDate = "2022-03-02T00:00:00+01:00"

        })
    console.log("this is the date" + ResultArrivalDate)
    res.send("end")

})

router.post("/registerEBoM", (req, res) => {
    db.sequelize
        .sync()
        .then(function() {
            db.ebom.create({
                product_id: req.body["idproduct"]
            })
        })
        .then(function() {
            db.ebom_partcode.create({
                ebom_id: req.body["ebomPartcode1"][0],
                code: req.body["ebomPartcode1"][1],
                description: req.body["ebomPartcode1"][2]
            })
        })
        .then(() => {
            res.send("Ebom registration finished sucessfully")
        })
})

router.post("/registerMBoM", (req, res) => {
    db.sequelize
        .sync()
        .then(function() {
            db.mbom.create({
                product_id: req.body["product_id"],
                project_code: req.body["project_code"],
                approved_by: req.body["approved_by"],
                last_update: req.body["last_update"],
                mod_from: req.body["mod_from"]
            })
        })
        .then(function() {
            db.mbom_partcode.create({
                mbom_id: req.body["mbomPartcode1"][0],
                M_b: req.body["mbomPartcode1"][1],
                level: req.body["mbomPartcode1"][2],
                pos: req.body["mbomPartcode1"][3],
                um: req.body["mbomPartcode1"][4],
                qty: req.body["mbomPartcode1"][5],
                description: req.body["mbomPartcode1"][6],
                Fan: req.body["mbomPartcode1"][7],
                project_pos: req.body["mbomPartcode1"][8],
                serial: req.body["mbomPartcode1"][9],
                project_stock: req.body["mbomPartcode1"][10],
                note: req.body["mbomPartcode1"][11],
                primary: req.body["mbomPartcode1"][12]
            })
        })
})


// prende in input il json del sales order da registrare e lo salva nel db
router.post("/salesOrderRegistration", (req, res) => {
    db.sequelize
        .sync()
        .then(() => {
            db.sales_order.create({
                client_id: req.body["client_id"],
                date: req.body["date"],
            })
        })
        .then(() => {
            db.sales_order_item.create({
                product_id: req.body["orderItem1"][0],
                qty: req.body["orderItem1"][1],
                sales_order_id: req.body["orderItem1"][2],
            })
        })
        .then(() => {
            res.send("insertion sales order and order items in the database finished sucessfully")
        })
})


module.exports = router