export default class Logger {
  constructor() {}

  log(msg: string, args?: any) {
    console.log(`[LOG] - ${new Date().toISOString()} -- ${msg}`, args)
  }

  error(msg: string, args?: any) {
    console.error(`[ERROR] - ${new Date().toISOString()} -- ${msg}`, args)
  }
}