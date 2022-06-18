const price = (price) => {
  Number.prototype.format = function (n, x) {
    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
  };
  return price.format();
};

const sample = async function(){
  const res = await fetch(`//yardblocksdb.whizz-kid.repl.co/api/addnew`);
  const json = await res.json()
  // console.log(json)
  return json
};

// const listing = [];

export default sample;