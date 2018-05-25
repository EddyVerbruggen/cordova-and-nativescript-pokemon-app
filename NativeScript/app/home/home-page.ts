import { HomeViewModel } from './home-view-model';

// Event handler for Page "navigatingTo" event attached in home-page.xml
export function onNavigatingTo(args) {
    const page = args.object;

    // This prevents the list from loading again when navigating back,
    // which also makes sure the scroll position is maintained.
    if (!args.isBackNavigation) {
        page.bindingContext = new HomeViewModel();
    }
}