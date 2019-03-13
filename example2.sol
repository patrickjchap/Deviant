pragma solidity ^0.4.22;

/// @title Voting with delegation.
contract Ballot {
    // This declares a new complex type which will
    // be used for variables later.
    // It will represent a single voter.
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        uint vote;   // index of the voted proposal
    }

    // This is a type for a single proposal.
    struct Proposal {
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    int internal intint;
	int private privint;
    address public chairperson;
	
	function hello() public modif{
		string hi = "what is up";
		int memory goodbyeforever;
		int memory helloforever;
		address cool = 0x10;
		hello = Ballot(chairperson);
		byte = NotBallot(chairperson);

	}

	modifier modif() {
		require(msg.sender == chairperson);
		_;
	}

	function bye() public{
		this.hello.gas(1000);
		emit howareyou(chairperson);
	}

	function errorhandled() {
		assert(true);
		require(false);
		revert("this is a revert");
	}

	function who() public payable {

	}

	event howareyou(address who);
}

contract NotBallot {

}

contract something is NotBallot, Ballot {
	address rand_addr = 0x123;

	function kill() {
		if (msg.sender == NotBallot) selfdestruct(NotBallot);
	}

	function random() {
		rand_addr.send(1);
		rand_addr.transfer(1);
	}
}

library thisisalibrary {
	function what() public returns (bool) {
		return true;
	}
}

