export function maximaSetName(name: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxima action:setname name:${name}`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function maxima() {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxima`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function maxContactAdd(contact: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxcontacts action:add contact:${contact}`, function (response: any) {
      if (response.response && response.response.maxima.delivered) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function maxContactRemove(contactId: number) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxcontacts action:remove id:${contactId}`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function maxContacts() {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxcontacts`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function sql(query: string, singleResult = true) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.sql(query, function (response: any) {
      if (response.status) {
        if (response.rows && singleResult) {
          return resolve(response.rows[0]);
        } else if (response.rows) {
          return resolve(response.rows);
        }

        return resolve(response.status);
      }

      return reject();
    });
  });
}

const exports = {
  maximaSetName,
}

export default exports;
