import { scanAllServers } from 'helpers.js';

const argsSchema = [
  ['a', false], // Set to true to cleanup all servers
  ['all', false],
  ['n', false], // Set to true to do a dry run
  ['dryrun', false],
  ['s', false], // Set to suppress summary output
  ['silent', false],
  ['v', false], // Set to print all files removed
  ['verbose', false],
];

export function autocomplete(data, _) {
  data.flags(argsSchema);
  return [];
}

/** @param {NS} ns **/
export async function main(ns) {
  const options = ns.flags(argsSchema);
  const all = options.a || options.all;
  const dryrun = options.n || options.dryrun;
  const silent = options.s || options.silent;
  const verbose = options.v || options.verbose;
  const servers = all ? scanAllServers(ns) : ['home'];

  let fileCount = 0;
  let serverCount = 0;
  for (let server of servers) {
    let files = server === 'home' ? ns.ls('home', '/Temp/') : ns.ls(server, '.js');
    if (files.length > 0) {
      fileCount++;
      serverCount++;
    }
    for (let file of files) {
      if (dryrun || verbose) ns.tprint(`(${server}) rm ${file}`);
      if (!dryrun) ns.rm(file, server);
    }
  }
  if (!silent) ns.tprint(`Removed (${fileCount}) files on (${serverCount})`);
}
