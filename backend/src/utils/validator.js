let errors = [];

function ValidationContract() {
  errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0)
    errors.push({ success: false, message: message });
};

ValidationContract.prototype.hasMinLen = (value, min, message) => {
  if (!value || value.length < min)
    errors.push({ success: false, message: message });
};

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
  if (!value || value.length > max)
    errors.push({ success: false, message: message });
};

ValidationContract.prototype.isEmail = (value, message) => {
  var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(value)) errors.push({ success: false, message: message });
};

ValidationContract.prototype.isCpfCnpj = (value, message) => {
  var reg = new RegExp(
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
  );
  if (!reg.test(value)) errors.push({ success: false, message: message });
};

ValidationContract.prototype.errors = () => {
  return errors;
};

ValidationContract.prototype.clear = () => {
  errors = [];
};

ValidationContract.prototype.isValid = () => {
  return errors.length == 0;
};

module.exports = ValidationContract;
