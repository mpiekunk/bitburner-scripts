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
  const dryRun = options.n || options.dryrun;
  const silent = options.s || options.silent;
  const verbose = options.v || options.verbose;
  const servers = all ? scanAllServers(ns) : ['home'];
  const msgPrefix = dryRun ? 'Remove' : 'Removed';
  

  let fileCount = 0;
  let serverCount = 0;
  for (let server of servers) {
    // Set the list of grep statements for ls based on home server or remote server
    let grepList = server === 'home' ? ['/Temp/'] : ['/Remote/', 'helpers.js'];
    
    let files = [];

    // Get files on server for all grep statements
    for (let grep of grepList) {
      files.push(...(ns.ls(server, grep)));
    }

    // Increase server/file count if files found, otherwise skip to next server
    if (files.length > 0) {
      serverCount++;
      fileCount = fileCount + files.length;
    }
    else { continue; }

    // Remove each file if not dry run
    if (!dryRun) {
      for (let file of files) ns.rm(file, server);
    }

    // Print result if dry run or verbose
    if (dryRun || verbose) ns.tprint(`${msgPrefix} (${files.length}) files on '${server}': [ ${files} ]`);

  }

  // Print summary statement
  if (!silent) ns.tprint(`${msgPrefix} (${fileCount}) files on (${serverCount}) servers`);
}
