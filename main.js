(function () {

  async function readFromClipboard() {
    const p = navigator.permissions.query({ name: "clipboard-read" });
    return p.then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        return navigator.clipboard.readText();
      }
    });
  }

  async function writeToClipboard(text) {
    const p = navigator.permissions.query({ name: "clipboard-write" });
    return p.then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.writeText(text);
      }
    });
  }

  async function copyExistingSignatures() {

    var output = "";

    $("#sigTable tbody tr").each(function(row) {
      var signature = tripwire.client.signatures[$(this).data("id")];
      var row = [];

      if (signature.signatureID) {
        row.push(signature.signatureID.substring(0, 3).toUpperCase() + "-" + (signature.signatureID.substring(3, 6) || "###"));
      } else {
        row.push("null");
      }

      row.push(signature.type);
      if (signature.type === "wormhole") {
        var wormhole = $.map(tripwire.client.wormholes, function(wormhole) { if (wormhole.initialID == signature.id || wormhole.secondaryID == signature.id) return wormhole; })[0];
        var otherSignature = signature.id == wormhole.initialID ? tripwire.client.signatures[wormhole.secondaryID] : tripwire.client.signatures[wormhole.initialID];
        row.push(wormhole.type || "null" );
        row.push(tripwire.systems[signature.systemID] ? tripwire.systems[signature.systemID].name : tripwire.aSigSystems[signature.systemID]);
        row.push(tripwire.systems[otherSignature.systemID] ? tripwire.systems[otherSignature.systemID].name : tripwire.aSigSystems[otherSignature.systemID]);
        row.push(wormhole.life);
        row.push(wormhole.mass);
      } else {
        row.push(signature.name);
      }

      row.push(signature.createdByName);
      row.push(signature.lifeTime);
      row.push(signature.lifeLength);
      row.push(signature.lifeLeft);
      row.push(signature.modifiedByName);
      row.push(signature.modifiedTime);
      output += row.join(options.signatures.copySeparator) + "\r\n";
    });
    $("#clipboard").text(output);
    $("#clipboard").focus();
    $("#clipboard").select();

    await writeToClipboard(output);
  }

  async function addNewSignature() {
    const regex = /^(\w{3})-(\d{3}),([\w\d]{4}),([\w\d- ].+),(\w{3})-(\d{3}),([\w\d]{4})$/;
    const text = await readFromClipboard();
    if (!regex.test(text)) return;

    $("#add-signature").click();
    const $f = (name) => $(`#form-signature [name=${name}]`);

    /* setTimeout(fn, 0) allows DOM time to update after opening dialog */
    setTimeout(function () {

      var e = text.match(regex);

      /* Trigger refresh to update active fields */
      $f("signatureType")
        .val("wormhole")
        .selectmenu("refresh")
        .trigger("selectmenuchange");

      /* Thera side */
      $f("signatureID_Alpha").val(e[1]);
      $f("signatureID_Numeric").val(e[2]);
      $f("wormholeType").val(e[3]);
      $f("leadsTo").val(e[4]);

      /* Other side */
      $f("signatureID2_Alpha").val(e[5]);
      $f("signatureID2_Numeric").val(e[6]);
      $f("wormholeType2").val(e[7]);

      /* Setting signature length to 17 hours prevents issue where wormholes */
      /* expire in Tripwire before expiring in EvE. */
      $f("signatureLength").val(61200).change();

      $("#form-signature").submit();

    }, 0);
  }

  const $ctrl = $("#signaturesWidget .controls");

  if (!$ctrl.find("#thera-copy").length) {
    $('<i id="thera-copy">copy</i>')
      .click(copyExistingSignatures)
      .appendTo($ctrl);
  }

  if (!$ctrl.find("#thera-paste").length) {
    $('<i id="thera-paste">paste</i>')
      .click(addNewSignature)
      .appendTo($ctrl);
  }

})();
