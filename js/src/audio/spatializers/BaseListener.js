﻿import { BaseSpatializer } from "./BaseSpatializer.js";
import { ManualVolume } from "./ManualVolume.js";

let hasAudioContext = Object.prototype.hasOwnProperty.call(window, "AudioContext"),
    hasStereoPanner = hasAudioContext && Object.prototype.hasOwnProperty.call(AudioContext.prototype, "createStereoPanner");

export class BaseListener extends BaseSpatializer {
    /**
     * Creates a spatializer that keeps track of position
     * @param {Destination} destination
     */
    constructor(destination) {
        super(destination);
    }

    /**
     * Creates a spatialzer for an audio source.
     * @private
     * @param {string} id
     * @param {MediaStream|HTMLAudioElement} stream - the audio element that is being spatialized.
     * @param {number} bufferSize - the size of the analysis buffer to use for audio activity detection
     * @return {BaseSource}
     */
    createSource(id, stream, bufferSize) {
        if (hasStereoPanner) {
            try {
                return new ManualStereo(id, this, stream, bufferSize);
            }
            catch (exp) {
                hasStereoPanner = false;
            }
        }

        if (!hasStereoPanner) {
            return new ManualVolume(id, this.destination, stream);
        }
    }
}