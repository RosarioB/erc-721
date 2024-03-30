import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { FootballPlayers} from "../typechain-types";

describe("FootballPlayers", () => {
  let footballPlayers: FootballPlayers;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;

  beforeEach(async () => {
    footballPlayers = await ethers.deployContract("FootballPlayers");
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await footballPlayers.owner()).to.equal(owner.address);
    });

    it("Should assign the contract name and symbol correctly", async () => {
      expect(await footballPlayers.name()).to.equal("Football Players");
      expect(await footballPlayers.symbol()).to.equal("FTP");
    });
  });

  describe("Minting", () => {
    it("Should mint a new token and assign it to owner", async () => {
      await footballPlayers.safeMint(owner.address);
      expect(await footballPlayers.ownerOf(0)).to.equal(owner.address);
    });

    it("Should fail if non-owner tries to mint", async () => {
      await expect(footballPlayers.connect(addr1).safeMint(addr1.address))
      .to.be.revertedWithCustomError(footballPlayers, "OwnableUnauthorizedAccount");
    });

    it("Should auto increment tokenId with each new minted token", async () => {
        await footballPlayers.safeMint(await owner.getAddress());
        expect(await footballPlayers.ownerOf(0)).to.equal(await owner.getAddress());
  
        await footballPlayers.safeMint(await owner.getAddress());
        expect(await footballPlayers.ownerOf(1)).to.equal(await owner.getAddress());
    });

    it("Should not mint more than TOKEN_CAP tokens", async () => {
      const TOKEN_CAP = 4;
      for (let i = 0; i <= TOKEN_CAP; i++) {
        await footballPlayers.safeMint(owner.address);
      }
      await expect(footballPlayers.safeMint(owner.address)).to.be.revertedWith("Token cap exceeded");
    });

    it("Should return the right tokenURI", async () => {
      const BASE_URI: String = "ipfs://bafybeiag6fokmiz6xmjodjyeuejtgrbyf2moirydovrew2bhmxjrehernq/"
      await footballPlayers.safeMint(owner.address);
      expect(await footballPlayers.tokenURI(0)).to.equal(BASE_URI + "0.json");
    });
  });

  describe("Token transferring", () => {
    it("Should transfer a token from one address to another", async () => {
        await footballPlayers.safeMint(await owner.getAddress());
        await footballPlayers["safeTransferFrom(address,address,uint256)"](owner, addr1, 0);
        expect(await footballPlayers.ownerOf(0)).to.equal(await addr1.getAddress());
    });
  
    it("Should revert when trying to transfer a token that is not owned", async () => {
      await footballPlayers.safeMint(await owner.getAddress());
      await expect(
        footballPlayers.connect(addr1)["safeTransferFrom(address,address,uint256)"] (addr1, addr2, 0)
      ).to.be.revertedWithCustomError(footballPlayers, "ERC721InsufficientApproval");
    });

    it("Should not send tokens to the 0 address", async () => {
      await footballPlayers.safeMint(await owner.getAddress());
      await expect(
        footballPlayers["safeTransferFrom(address,address,uint256)"] (owner, ethers.ZeroAddress, 0)
      ).to.be.revertedWithCustomError(footballPlayers, "ERC721InvalidReceiver");
    });
  });
    
  // Add more tests for other functionalities of your contract.
});
