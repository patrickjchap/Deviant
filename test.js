var fs = require('fs');
var solm = require('solmeister');
var parser = require('solparse');
var path = require('path');

fs.readFile('example2.sol', function (err, data) {
     let mutCode = solm.edit(data.toString(), function(node) {
        if(node.type == 'ContractStatement') {
            node.body[0] =  {
          "type": "StateVariableDeclaration",
          "name": "insertion",
          "literal": {
            "type": "Type",
            "literal": "address",
            "members": [],
            "array_parts": [],
            "start": 1704,
            "end": 1711
          },
          "visibility": null,
          "is_constant": false,
          "value": {
            "type": "Literal",
            "value": "0x123",
            "start": 1724,
            "end": 1729
          },
          "start": 1704,
          "end": 1730
        };

            
            console.log(node.getSourceCode().replace('{', '{\nint newInt;\n'));
            return process.exit(123);
        }
    });
});
