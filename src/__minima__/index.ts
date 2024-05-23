export function maximaSetName(name: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxima action:setname name:"${name}"`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function maximaSetIcon(icon: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxima action:seticon icon:"${encodeURIComponent(icon)}"`, function (response: any) {
      
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

export function getAddress() {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`getaddress`, function (response: any) {
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

export function maxContactExport(): Promise<string> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxcontacts action:export`, function (response: any) {
      if (response.response) {
        return resolve(response.response.contactlist);
      }


      return reject();
    });
  });
}

export function maxContactImport(contactlist: string): Promise<number> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxcontacts action:import contactlist:${contactlist}`, function (response: any) {

      if (response.response) {
        return resolve(response.response.size);
      }


      return reject();
    });
  });
}

export function maxContactRemove(contactId: number) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxcontacts action:remove id:${contactId}`, function (response: any) {
      if (response.response.removed) {
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

export function staticMLS(address: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxextra action:staticmls host:${address}`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}


export function clearStaticMLS() {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxextra action:staticmls host:clear`, function (response: any) {
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
