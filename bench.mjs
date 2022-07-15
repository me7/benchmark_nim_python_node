import { run, bench, group, baseline } from "mitata";
import { exec } from 'child_process'
async function main() {
  // compile nim program first
  await exec("nim c -d:release -O:loopR loop.nim")
  await exec("nim c -O:loopD loop.nim")

  group('50K echo test on win 11', () => {
    bench('NOOP', () => { }),
      bench('nim v1.6.6 release mode', () => exec("loopR.exe"), console.log),
      bench('nim v1.6.6 debug mode', () => exec("loopD.exe"), console.log),
      bench('python 3.8.6', () => exec("python3 loop.py"), console.log),
      baseline('node v16.13.1', () => exec("node loop.mjs"), console.log)
  })

  await run({
    avg: true, // enable/disable avg column (default: true)
    json: false, // enable/disable json output (default: false)
    colors: true, // enable/disable colors (default: true)
    min_max: true, // enable/disable min/max column (default: true)
    collect: false, // enable/disable collecting returned values into an array during the benchmark (default: false)
    percentiles: true, // enable/disable percentiles column (default: true)
  });
}

main()