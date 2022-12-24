"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var sharpResize_1 = require("../../utilities/sharpResize");
var imageRoute = (0, express_1.default)();
imageRoute.get('/image', function (req, res) {
    var imgWidth = req.query.width;
    var imgHeight = req.query.height;
    var imgName = req.query.filename;
    var imageDir = path_1.default.join(__dirname, "../../../sourceImage/".concat(imgName, ".jpg"));
    if (imgName === undefined) {
        return res
            .status(400)
            .send('unrecognized query please use {filename} to continue');
    }
    if (fs_1.default.existsSync(imageDir) === false) {
        var folderPath = path_1.default.join(__dirname, '../../../sourceImage/');
        var filesName_1 = [];
        fs_1.default.readdirSync(folderPath).map(function (file) {
            var fileO = path_1.default.parse(file).name;
            filesName_1.push(fileO);
        });
        return res
            .status(404)
            .send("filename does not exists please use one of the file names: ".concat(filesName_1));
    }
    if (imgWidth === undefined && imgHeight === undefined) {
        return res.sendFile(imageDir);
    }
    if (typeof imgWidth === 'string' && imgHeight === undefined) {
        var width = parseInt(imgWidth);
        var outputFileNew_1 = path_1.default.join(__dirname, '../../../resizedImages/' + imgName + '-resized width-' + width + '.jpg');
        if (!Number.isNaN(width) && width > 0) {
            if (fs_1.default.existsSync(outputFileNew_1) === false) {
                (0, sharpResize_1.resizeImgWidth)(imageDir, width, imgHeight, imgName);
                setTimeout(function () {
                    return res.status(200).sendFile(outputFileNew_1);
                }, 500);
            }
            if (fs_1.default.existsSync(outputFileNew_1) === true) {
                return res.status(200).sendFile(outputFileNew_1);
            }
        }
        if (!Number.isNaN(width) && width <= 0) {
            res.status(400).send('please use a number greater than 0');
        }
        if (Number.isNaN(width)) {
            res.status(400).send('please use number not a string');
        }
    }
    if (typeof imgHeight === 'string' && imgWidth === undefined) {
        var height = parseInt(imgHeight);
        var outFilenewHeight_1 = path_1.default.join(__dirname, '../../../resizedImages/' + imgName + '-resized height-' + height + '.jpg');
        if (!Number.isNaN(height) && height > 0) {
            if (fs_1.default.existsSync(outFilenewHeight_1) === false) {
                (0, sharpResize_1.resizeImgHeight)(imageDir, imgWidth, height, imgName);
                setTimeout(function () {
                    return res.status(200).sendFile(outFilenewHeight_1);
                }, 500);
            }
            if (fs_1.default.existsSync(outFilenewHeight_1) === true) {
                return res.status(200).sendFile(outFilenewHeight_1);
            }
        }
        if (!Number.isNaN(height) && height <= 0) {
            res.status(400).send('please use a number greater than 0');
        }
        if (Number.isNaN(height)) {
            res.status(400).send('please use number not a string');
        }
    }
    if (typeof imgWidth === 'string' && typeof imgHeight === 'string') {
        var width = parseInt(imgWidth);
        var height = parseInt(imgHeight);
        if (Number.isNaN(width) || Number.isNaN(height)) {
            return res
                .status(400)
                .send('Error! please use number not a string greater than 0 {width=number} {height=number}');
        }
        if (!Number.isNaN(width) &&
            !Number.isNaN(height) &&
            width > 0 &&
            height > 0) {
            var outFilenewWH_1 = path_1.default.join(__dirname, '../../../resizedImages/' +
                imgName +
                '-' +
                width +
                '-' +
                height +
                '.jpg');
            if (fs_1.default.existsSync(outFilenewWH_1) === false) {
                (0, sharpResize_1.resizeImgWH)(imageDir, width, height, imgName);
                setTimeout(function () {
                    return res.status(200).sendFile(outFilenewWH_1);
                }, 500);
            }
            if (fs_1.default.existsSync(outFilenewWH_1) === true) {
                return res.status(200).sendFile(outFilenewWH_1);
            }
        }
        if (!Number.isNaN(width) &&
            !Number.isNaN(height) &&
            (width <= 0 || height <= 0)) {
            res.status(400).send('please use number greater than 0');
        }
    }
});
exports.default = imageRoute;
