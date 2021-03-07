import {
  faTimes,
  faVolumeUp,
  faHashtag,
} from '@fortawesome/free-solid-svg-icons';
import {
  faComments as farFaComments,
  faCircle as farFaCircle,
  faDotCircle as farFaDotCircle,
} from '@fortawesome/free-regular-svg-icons';
import { library, config, dom } from '@fortawesome/fontawesome-svg-core';

library.add(
  // fas
  faTimes,
  faVolumeUp,
  faHashtag,
  // far
  farFaComments,
  farFaCircle,
  farFaDotCircle,
);

config.searchPseudoElements = true;

dom.watch();
