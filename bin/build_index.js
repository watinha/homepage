#!/usr/local/bin/node

var mu = require('mu2'),
    fs = require('fs');

mu.root = __dirname + '/../templates';
fs.readFile('templates/curriculum.json', function (err, data) {
    var json_data = JSON.parse(data.toString()),
        template_stream;
    if (!err) {
        json_data.has_css = true;
        json_data.has_js = true;
        template_stream = mu.compileAndRender('curriculum.html.mustache', json_data);
        template_stream.on('data', function (rendered_template) {
            process.stdout.write(rendered_template.toString('utf-8'));
        });
    }
});
