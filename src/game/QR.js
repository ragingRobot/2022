import QRious from 'qrious';

export default class QR {
  static getCode() {
    let domain = (new URL(window.location.href));
    const qr = new QRious({
      value: domain.hostname + (window.location.port ? ":" + window.location.port : "") + '/controller',
    });
    return qr.toDataURL();
  }
}
