const argsSchema = [
  ['c', false],
  ['connect', false],
  ['help', false],
];

/** @param {NS} ns **/
export async function main(ns) {
  const options = ns.flags(argsSchema);
  const printConnect = options.c || options['connect']; // options.connect consumed 32GB RAM?!?!?
  let server = options._[0];
  if (!server || options.help) {
    ns.tprint('This script helps you find a server on the network and connect to it.');
    ns.tprint(`Usage: run ${ns.getScriptName()} [-c | --connect] SERVER`);
    ns.tprint('Example:');
    ns.tprint(`> run ${ns.getScriptName()} n00dles`);
    return;
  }

  let route = [];
  recursiveScan(ns, '', 'home', server, route);

  printConnect ? printTerminal(ns, route) : await printMap(ns, route);
}

function printTerminal(ns, route) {
  let doc = eval('document');
  let tIn = doc.getElementById('terminal-input');
  let tEv = tIn[Object.keys(tIn)[1]];
  let tcommand = (x) => {
    tIn.value = x;
    tEv.onChange({ target: tIn });
    tEv.onKeyDown({ keyCode: '13', preventDefault: () => 0 });
  };

  let connectionString = ['home;'];
  for (const s of route) {
    if (s != 'home') {
      connectionString.push(`connect ${s};`);
    }
  }

  tcommand(connectionString.join(' '));
}

async function printMap(ns, route) {
  for (const i in route) {
    await ns.sleep(300);
    const extra = i > 0 ? '└ ' : '';
    ns.tprint(`${' '.repeat(i)}${extra}${route[i]}`);
  }
}

function recursiveScan(ns, parent, server, target, route) {
  const children = ns.scan(server);
  for (let child of children) {
    if (parent == child) {
      continue;
    }
    if (child == target) {
      route.unshift(child);
      route.unshift(server);
      return true;
    }

    if (recursiveScan(ns, server, child, target, route)) {
      route.unshift(server);
      return true;
    }
  }
  return false;
}

export function autocomplete(data, args) {
  const flags = data.flags(argsSchema);
  return [...data.servers];
}
