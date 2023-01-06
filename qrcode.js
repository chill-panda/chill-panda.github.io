const tag_for_qr = 'cafeuntitled'
const tag_required = true
const qrcode_download = true

var canvas = document.getElementById('canvas')
var link = document.getElementById('link');
var options = {
	width: 300,
	color: {
		dark: '#000000',  // Black dots
		light: '#FFFFFF' // Transparent background
	}
}

$.getJSON('resources/content.json', allretailcontent => {
    $.getJSON('resources/config.json', config => {
    	const PROD_URL = config['prod_url']
    	var url = PROD_URL + '?' + config['tag1'] + '=' + tag_for_qr
		QRCode.toCanvas(canvas, tag_required ? url : PROD_URL, options, function (error) {
			if (error) console.error(error)
		  	console.log('success!');
		})

		var save_to_file = 'qrcode.png'
		link.setAttribute('download', save_to_file)
		link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
		if (qrcode_download) {
			link.click();
		}
		// var save_to_file = 'qrcode.png'
		// QRCode.toFile(config[config['tag1']][tag_for_qr] + save_to_file, url, options, function (err) {
		//   if (err) throw err
		//   console.log('done')
		// })
    })
})

// https://github.com/soldair/node-qrcode#qr-code-options