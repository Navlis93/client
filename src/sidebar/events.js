'use strict';

/**
 * This module defines the set of global events that are dispatched
 * on $rootScope
 */
module.exports = {

  // Internal state changes
  FRAME_CONNECTED: 'frameConnected',

  // Session state changes

  /** The list of groups changed */
  GROUPS_CHANGED: 'groupsChanged',
  /** The logged-in user changed */
  USER_CHANGED: 'userChanged',

  // UI state changes

  /** The currently selected group changed */
  GROUP_FOCUSED: 'groupFocused',

  // Annotation events

  /** A new annotation has been created locally. */
  BEFORE_ANNOTATION_CREATED: 'beforeAnnotationCreated',

  /** Annotations were anchored in a connected document. */
  ANNOTATIONS_SYNCED: 'sync',

  /** An annotation was created on the server and assigned an ID. */
  ANNOTATION_CREATED: 'annotationCreated',

  /** An annotation was either deleted or unloaded. */
  ANNOTATION_DELETED: 'annotationDeleted',

  /** An annotation was either created or updated */
  ANNOTATION_REFRESHED: 'annotationRefreshed',

  /** An annotation was flagged. */
  ANNOTATION_FLAGGED: 'annotationFlagged',

  /** An annotation has been updated. */
  ANNOTATION_UPDATED: 'annotationUpdated',

  /** A set of annotations were loaded from the server. */
  ANNOTATIONS_LOADED: 'annotationsLoaded',

  /** An annotation is unloaded. */
  ANNOTATIONS_UNLOADED: 'annotationsUnloaded',

  TYPES_LOADED: 'typesLoaded',
};
