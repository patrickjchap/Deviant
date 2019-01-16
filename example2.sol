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

    address public chairperson;
	
	function hello() public modif{
		string hi = "what is up";
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
	}
}

contract NotBallot {

}

