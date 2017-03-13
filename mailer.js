const config = require('./config');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bmwstorageservice@gmail.com',
        pass: 'bmwxdrive'
    }
});

function emailReport(props) {
	var now = new Date();
 	var timestamp = (now.getMonth() + 1) + "." + now.getDate() + "." + now.getFullYear();
	var fileName = props.targetService + "_Report_" + config.region.toUpperCase() + "_" + timestamp + ".csv";  
	return new Promise(function (resolve, reject) {
		transporter.sendMail({
	        from: 'bmwstorageservice@gmail.com',
	        to: props.recipients,
	        subject: props.targetService + ' Report ' + config.region.toUpperCase() + ' ' + timestamp,
	        text: props.targetService + ' Report ' + config.region.toUpperCase() + ' ' + timestamp,
	        attachments: [
	            {
	                filename: fileName,
	                content: props.tableData,
	            }
	        ]
	    }, function (error, info) {
	    	if(error) {
	    		reject(error);
	    	}
	    	resolve(info);
	    });
	});    
}

module.exports = emailReport;