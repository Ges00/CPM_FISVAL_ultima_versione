import requests
import json

ebom = {
    "product_id": 1,
    "ebom_partcode1":
        [
            1, #ebom id
            "code test", #code
            "desc test", #description
        ]
}

mbom = {
    "product_id": 1,
    "project_code": "test proj code",
    "approved_by": "approved test",
    "last update": "01/01/2001 12.12.12",
    "mode_from": "mod test",
    "mbom_partcode1":
        [
            1, #mbom_id
            "mb", #M/b
            1, #level
            "test pos", #pos
            "um", #um
            1, #qty
            "desc test", #description
            "fan test", #fan
            "proj pos test", #project_pos
            "serial test", #serial
            True, #project_stock
            "note test", #note
            True, #primary
        ]

}

sales_order = {
    "client_id": 1,
    "date": "01/01/2001 12.12.12",
    "orderItem1":
        [
            1, #product_id
            1, #qty
            1 #sales_order_id
        ]
}



production_order = {
    "client_id": 1,
    "mbom_partcode_id": 1,
    "year": 1,
    "odp_code": "odp code test",
    "qty": 1,
    "odp_status": "odp status test",
    "phase1": 
        [
            1, #phase_number
            1, #operation_number
            "desc op", #operation_description
            1, #operation_number_text
            0.1, #time
            "inspection test", #inspection
            1, #work_center_group_id
            1, #resource_id
            "01/01/2001 12.12.12", #start_date
            "01/01/2001 12.12.12", #end_date
            "vendor test", #vendor name
            "inspection test", #inspection
            0.1, #queue_time_before
            0.1, #setup_time
            0.1, #process_time
            0.1, #trans_ptime
            0.1 #queue_time_after
        ]
  }



#rEbom = requests.post("http://localhost:4000/services/ebomJsonPOST", (ebom))
#rMbom = requests.post("http://localhost:4000/services/mbomJsonPOST", (mbom))
#rSalesOrder = requests.post("http://localhost:4000/services/salesOrderRegistration", (sales_order))
rProdOrder = requests.post("http://localhost:4000/services/notifyProductionOrder", (production_order))
#testjson = requests.post("http://localhost:4000/services/testjson", (sales_order_test))
#print(testjson)