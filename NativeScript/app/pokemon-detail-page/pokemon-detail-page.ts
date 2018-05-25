import { Page } from "tns-core-modules/ui/page";
import { Image } from "tns-core-modules/ui/image";
import { fromUrl } from "tns-core-modules/image-source";
import { alert } from "tns-core-modules/ui/dialogs";
import { topmost } from "tns-core-modules/ui/frame";
import { connectionType, getConnectionType } from "tns-core-modules/connectivity";
import * as SocialShare from "nativescript-social-share";

const PokemonDetailVM = require("./pokemon-detail-view-model");

let _page: Page;

export function onNavigatingTo(args) {
  const page: Page = args.object;
  page.bindingContext = new PokemonDetailVM(page.navigationContext);

  // Remember the page object for easy reference in 'onShareButtonTap'
  _page = page;
}

export function onBackButtonTap() {
  topmost().goBack();
}

export function onShareButtonTap(args) {
  if (getConnectionType() === connectionType.none) {
    alert({
      title: "No internet connection",
      message: "Please connect to the internet and try sharing again.",
      okButtonText: "OK, let me check..",
      cancelable: true
    });
    return;
  }

  const image: Image = _page.getViewById("pokemonImage");

  // Depending on the platform and internet connection, image.imageSource may be set.
  if (image.imageSource) {
    SocialShare.shareImage(image.imageSource);
  } else {
    fromUrl(image.src).then(downloadedImage => SocialShare.shareImage(downloadedImage));
  }
}
