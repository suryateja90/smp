module.exports = (app) => {
    const stdCtrl = require('../controllers/stdCtrl');
    app.route('/check').get(stdCtrl.new);
}
