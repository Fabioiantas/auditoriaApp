export const browserDBInstance = (db) => {

    return {
      executeSql: (sql) => {
        return new Promise((resolve, reject) => {
          db.transaction((tx) => {
            // tslint:disable-next-line:no-shadowed-variable
            tx.executeSql(sql, [], (tx, rs) => {
              resolve(rs);
            });
          });
        });
      },
      sqlBatch: (arr) => {
        return new Promise((r, rr) => {
          const batch = [];
          db.transaction((tx) => {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < arr.length; i++) {
              batch.push(new Promise((resolve, reject) => {
                tx.executeSql(arr[i], [], () => { resolve(true); });
              }));
              Promise.all(batch).then(() => r(true));
            }
          });
        });
      }
    };
  };
