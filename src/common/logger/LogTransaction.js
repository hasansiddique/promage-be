import isNil from 'lodash/isNil';

import Logger from './Logger';

export default class LogTransaction {
  constructor(data, complete = true) {
    const d = data; // clone data

    if (!complete) {
      d.StartTime = Date.now();
    }

    this.data = d;
  }

  async send(newData) {
    const data = Object.assign({}, this.data, newData);
    const time = Date.now();

    if (!isNil(data.StartTime)) {
      data.TotalTime = time - data.StartTime;
    }

    await Logger.send(data);
  }
}
