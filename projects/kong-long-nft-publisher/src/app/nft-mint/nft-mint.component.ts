import { NftFormService } from './../services/nft-form.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'projects/kong-long-nft-publisher/src/environments/environment';
import { KongLongNFT } from 'projects/kong-long-nft/src/app/contract/kong-long-nft';
import { TMetadata } from 'projects/lib-web3/src/lib/contracts/type-define';
import { IpfsService } from 'projects/lib-web3/src/lib/services/ipfs.service.ts.service';
import { Web3ProviderService } from 'projects/lib-web3/src/lib/services/web3-provider.service';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-nft-mint',
  templateUrl: './nft-mint.component.html',
  styleUrls: ['./nft-mint.component.sass'],
})
export class NftMintComponent {
  STEP_INIT = 0;
  STEP_UPLOAD_IMAGE = 1;
  STEP_UPLOAD_METADATA = 2;
  STEP_MINT = 3;
  STEP_FINISH = 4;

  imageHash: string | null;
  metadataHash: string | null;
  txHash: string | null;
  errMsg: string | null;
  mintStep = this.STEP_INIT;
  mintResult: 'success' | 'fail' | null;

  get isMintProgress(): boolean {
    return this.mintStep > this.STEP_INIT && this.mintStep < this.STEP_FINISH;
  }

  get isDisableMintBtn(): boolean {
    return this.isMintProgress || (this.mintStep === this.STEP_FINISH && this.mintResult === 'success');
  }

  constructor(
    private formService: NftFormService,
    private router: Router,
    private ipfsService: IpfsService,
    private web3Service: Web3ProviderService,
  ) {}

  ngOnInit(): void {
    if (!this.formService.isValid()) {
      this.router.navigate(['/']);
    }
  }

  onClickBackButton(): void {
    this.router.navigate(['preview']);
  }

  onClickHomeButton(): void {
    this.router.navigate(['/']);
  }

  getTxLink(txHash: string): string {
    return `${environment.polygonScanURL}tx/${txHash}`;
  }

  getIpfsLink(cid: string): string {
    return `${environment.ipfsGatewayURL}ipfs/${cid}`;
  }

  mint(): void {
    this.resetStatus();

    const address = environment.kongLongNFTAddress;
    const contract = this.web3Service.getContract(KongLongNFT, address) as KongLongNFT;
    let account: string;

    const formValue = this.formService.getFormValue();
    const imgFile = this.formService.getImageFile() as File;

    this.web3Service
      .requestAccounts$()
      .pipe(
        filter((accounts) => accounts.length > 0),
        switchMap((accounts) => {
          account = accounts[0];
          this.mintStep = this.STEP_UPLOAD_IMAGE;
          return this.ipfsService.addAndPin$(imgFile);
        }),
        switchMap((imgHash) => {
          this.imageHash = imgHash;

          this.mintStep = this.STEP_UPLOAD_METADATA;
          const metadata = this.buildMetadata(formValue, imgHash);
          return this.ipfsService.addAndPin$(JSON.stringify(metadata));
        }),
        switchMap((metadataHash) => {
          this.metadataHash = metadataHash;

          this.mintStep = this.STEP_MINT;
          return contract.mint(formValue.owner, this.ipfsService.addIpfs2Hash(metadataHash), account);
        }),
      )
      .subscribe(
        (transaction) => {
          this.txHash = transaction.transactionHash;

          this.mintStep = this.STEP_FINISH;
          this.mintResult = 'success';
          this.formService.resetForm();

          console.log('mint token', transaction);
        },
        (err: Error) => {
          this.errMsg = err.message;
          this.mintStep = this.STEP_FINISH;
          this.mintResult = 'fail';

          console.log('mint fail', err);
        },
      );
  }

  private buildMetadata(formVale: any, imageHash: string): TMetadata {
    return {
      name: formVale.name,
      description: formVale.description,
      image: this.ipfsService.addIpfs2Hash(imageHash),
      attributes: formVale.attributes,
    };
  }

  private resetStatus(): void {
    this.mintStep = this.STEP_INIT;
    this.imageHash = null;
    this.metadataHash = null;
    this.txHash = null;
    this.errMsg = null;
    this.mintResult = null;
  }
}
