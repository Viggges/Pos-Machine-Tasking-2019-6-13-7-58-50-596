var totalPrice=0;
function printReceipt(barcodes,database){
    let dataNeed=solveData(barcodes,database);
    let commInfo=solveBarcodes(dataNeed,barcodes);
    let formatInfo=formatPrint(commInfo);
    return formatInfo;
}
function solveData(barcodes,database){
    let codeMap=new Map();
    for(let i=0;i<barcodes.length;i++){
        if(codeMap.get(barcodes[i])==null){
            codeMap.set(barcodes[i],1)
        }else{
            codeMap.set(barcodes[i],codeMap.get(barcodes[i])+1);
        }
    }
    let dataNeed=new Map();
    for(let i=0;i<database.length;i++){
        let temp=database[i];
        if(codeMap.get(temp["id"])==null){
            dataNeed.set(temp["id"],temp["name"]+"="+temp["price"])+"+"+0;
        }else{
            dataNeed.set(temp["id"],temp["name"]+"="+temp["price"]+"+"+codeMap.get(temp["id"]));
            totalPrice+=(temp["price"]*codeMap.get(temp["id"]));
        }
    }
    return dataNeed;
}
function solveBarcodes(dataNeed,barcodes){
    let comminfo="";
    dataNeed.forEach(function(value,key){
        
        if(barcodes.indexOf(key)!==-1){
            let equalIndex=value.indexOf("=");
            let addIndex=value.indexOf("+");
            comminfo+=(value.substring(0,equalIndex)
            +" ".padStart(34-addIndex, " ")//拼空格
            +value.substring(equalIndex+1,addIndex)
            +" ".padStart(12-value.length+addIndex, " ")
            +value.substring(addIndex+1)+"\n"
            );
        }
        dataNeed.delete(key);
    });
    return comminfo;
}
function formatPrint(commInfo){
    let formatInfo="Receipts\n";
    formatInfo+="------------------------------------------------------------\n";
    formatInfo+=commInfo;
    formatInfo+="------------------------------------------------------------\n";
    formatInfo+="Price: "+totalPrice;
    return formatInfo;
}
module.exports=printReceipt;