const responseCodeMessages: { [key: string]: any } = {
  "user.success": { messageTranslationKey: "keyVerification", type: "success" },
  "user.notexist": {
    messageTranslationKey: "userDoesNotExist",
    type: "success",
  },
  "user.email.notexist": {
    messageTranslationKey: "userEmailNotExist",
    type: "warning",
  },
  "user.email.notunique": {
    messageTranslationKey: "userEmailIsNotUnique",
    type: "warning",
  },
  "establishment.settingnotvalid": {
    messageTranslationKey: "emailSettingNotValid",
    type: "warning",
  },
  "user.email.sentsuccessfully": {
    messageTranslationKey: "emailSendMsg",
    type: "success",
  },
  "user.email.failtosend": {
    messageTranslationKey: "failToSendEmail",
    type: "warning",
  },
  "user.logonkeynotfoundornotmatch": {
    messageTranslationKey: "uniqueKeyNotMatch",
    type: "warning",
  },
  "user.password.containsblacklistedword": {
    messageTranslationKey: "passwordContainsBlacklistedWord",
    type: "warning",
  },
  "user.password.forgotsuccess": {
    messageTranslationKey: "successAlert",
    type: "success",
  },
  "area.users.ipblocked": {
    messageTranslationKey: "ipBlocked",
    type: "warning",
  },
  "area.username.message": {
    messageTranslationKey: "usernameRequired",
    type: "warning",
  },
  "area.password.message": {
    messageTranslationKey: "passwordRequired",
    type: "warning",
  },
  "area.users.passchange.changeInvalidPassword": {
    messageTranslationKey: "invalidPassword",
    type: "warning",
  },
  "messages.tasks.check.when.loggedin.user": {
    messageTranslationKey: "loggedInUser",
    type: "success",
  },
  "area.login.success": {
    messageTranslationKey: "logInSuccessful",
    type: "success",
  },
  "area.login.fail.superuserattempt": {
    messageTranslationKey: "superuserattempt",
    type: "warning",
  },
  "area.login.fail.maxfailedloginattemptsreached": {
    messageTranslationKey: "attemptsReached",
    type: "warning",
  },
  "area.login.fail.maxfailedloginattemptsreached.reset.password": {
    messageTranslationKey: "resetAttemptsReached",
    type: "warning",
  },
  "area.login.fail.usernamedisplayattempts": {
    messageTranslationKey: "usernamedisplayattempts",
    type: "warning",
  },
  "area.login.fail.username": {
    messageTranslationKey: "usernameFail",
    type: "warning",
  },
  "area.login.fail.nonapprovedestablishmentloginattempt": {
    messageTranslationKey: "nonapprovedestablishmentloginattempt",
    type: "warning",
  },
  "area.login.fail.nostartorenddatespecified": {
    messageTranslationKey: "nostartorenddatespecified",
    type: "warning",
  },
  "area.login.fail.licensenotstartedorended": {
    messageTranslationKey: "licensenotstartedorended",
    type: "warning",
  },
  "area.login.fail.notacceptableipaddress": {
    messageTranslationKey: "notacceptableipaddress",
    type: "warning",
  },
  "area.login.fail.maxusersreached": {
    messageTranslationKey: "maxusersreached",
    type: "warning",
  },
  "area.login.fail.notactiveuser": {
    messageTranslationKey: "notactiveuser",
    type: "warning",
  },
  "area.login.fail.useraccountexpired": {
    messageTranslationKey: "useraccountexpired",
    type: "warning",
  },
  "area.login.fail.userhasnotusergroup": {
    messageTranslationKey: "userhasnotusergroup",
    type: "warning",
  },
  "area.login.fail.useralreadyloggedin": {
    messageTranslationKey: "useralreadyloggedin",
    type: "warning",
  },
  "message.end.cellma.upgrade": {
    messageTranslationKey: "cellmaUpgrade",
    type: "warning",
  },
  "area.login.reminder.usernameequalspassword": {
    messageTranslationKey: "usernameequalspassword",
    type: "warning",
  },
  "area.login.reminder.passwordexpired": {
    messageTranslationKey: "passwordexpired",
    type: "warning",
  },
  "area.login.reminder.passwordexpiressoon": {
    messageTranslationKey: "passwordexpiressoon",
    type: "warning",
  },
  "messages.incorrectbarcode": {
    messageTranslationKey: "incorrectbarcode",
    type: "warning",
  },
  "patientList.found": {
    messageTranslationKey: "patientFoundAlert",
    type: "success",
  },
  "patientList.notfound": {
    messageTranslationKey: "patientNotFoundAlert",
    type: "warning",
  },
  "patient.duplicate.found": {
    messageTranslationKey: "duplicatePatientFoundAlert",
    type: "success",
  },
  "patient.duplicate.notfound": {
    messageTranslationKey: "duplicatePatientNotFoundAlert",
    type: "warning",
  },
  "pip.add.success": {
    messageTranslationKey: "pipAddSuccessAlert",
    type: "success",
  },
  "pip.update.success": {
    messageTranslationKey: "pipUpdateSuccessAlert",
    type: "success",
  },
  "pip.add.fail": { messageTranslationKey: "pipAddFailAlert", type: "warning" },
  "pip.show.success": {
    messageTranslationKey: "pipShowSuccessAlert",
    type: "success",
  },
  "pip.show.fail": {
    messageTranslationKey: "pipShowFailAlert",
    type: "success",
  },
  "patient.address.add.success": {
    messageTranslationKey: "addressAddedAlert",
    type: "success",
  },
  "patient.address.add.fail": {
    messageTranslationKey: "failToAddAddress",
    type: "warning",
  },
  "success.operation": {
    messageTranslationKey: "localGpFound",
    type: "success",
  },
  "establishmentgp.notfound": {
    messageTranslationKey: "localGpNotFound",
    type: "warning",
  },
  "national.gp.found": {
    messageTranslationKey: "nationalGpFound",
    type: "success",
  },
  "national.gp.notfound": {
    messageTranslationKey: "nationalGpNotFound",
    type: "warning",
  },
  "patient.update.success": {
    messageTranslationKey: "patientUpdateSuccess",
    type: "success",
  },
  "patient.update.fail": {
    messageTranslationKey: "patientUpdateFail",
    type: "warning",
  },
  "patient.add.success": {
    messageTranslationKey: "patientAddSuccessAlert",
    type: "success",
  },
  "patient.add.fail": {
    messageTranslationKey: "patientAddFailAlert",
    type: "warning",
  },
  "patient.address.update.success": {
    messageTranslationKey: "patientAddressUpdateAlert",
    type: "success",
  },
  "patient.address.update.fail": {
    messageTranslationKey: "patientAddressUpdateFailAlert",
    type: "warning",
  },
  "patient.photo.uploaded": {
    messageTranslationKey: "patientPhotoUploaded",
    type: "success",
  },
  "patient.photo.upload.fail": {
    messageTranslationKey: "patientPhotoUploadFailed",
    type: "warning",
  },
  "patient.demographic.changed.fail": {
    messageTranslationKey: "patientDemographicChangedFailed",
    type: "warning",
  },

  "cellma.user.api.version.found": {
    messageTranslationKey: "cellmaVersionFoundAlert",
    type: "success",
  },
  "cellma.user.api.version.notfound": {
    messageTranslationKey: "cellmaVersionNotFoundAlert",
    type: "warning",
  },
  "patient.gp.add.success": {
    messageTranslationKey: "gpAddedPatientAlert",
    type: "success",
  },
  "patient.gp.add.fail": {
    messageTranslationKey: "gpAddfailPatientAlert",
    type: "warning",
  },
  "establishmentgp.add.success": {
    messageTranslationKey: "estblishmentGpAddedAlert",
    type: "success",
  },

  "establishmentgp.add.fail": {
    messageTranslationKey: "nationalGpAddfailAlert",
    type: "warning",
  },
  "patient.identifier.add.success": {
    messageTranslationKey: "identifierAddedSuccessfully",
    type: "success",
  },
  "patient.identifier.add.fail": {
    messageTranslationKey: "identifierFailToAdd",
    type: "warning",
  },

  "establishmentgp.update.success": {
    messageTranslationKey: "establishmentGpUpdateAlert",
    type: "success",
  },

  "establishmentgp.update.fail": {
    messageTranslationKey: "establishmentGpUpdateFailAlert",
    type: "warning",
  },
  "unknown.patient.add.success": {
    messageTranslationKey: "addUnknownPatient",
    type: "success",
  },
  "unknown.patient.add.failure": {
    messageTranslationKey: "addUnknownPatientFail",
    type: "warning",
  },
  "test.patient.success": {
    messageTranslationKey: "testPatient",
    type: "success",
  },
  "test.patient.fail": {
    messageTranslationKey: "testPatientFail",
    type: "warning",
  },
  "patient.details.changed.success": {
    messageTranslationKey: "patientDetailsChangedSuccess",
    type: "success",
  },
  "patient.details.changed.fail": {
    messageTranslationKey: "patientDetailsChangedFail",
    type: "warning",
  },

  "customizabledispalyfield.add.success": {
    messageTranslationKey: "customizableDisplayFieldAddSuccess",
    type: "success",
  },
  "patient.death.add.success": {
    messageTranslationKey: "patientDeathAddSuccess",
    type: "success",
  },
  "patient.death.add.fail": {
    messageTranslationKey: "patientDeathAddFail",
    type: "warning",
  },
  "patient.identifier.delete.success": {
    messageTranslationKey: "identifierDeletedSuccess",
    type: "success",
  },
  "patient.identifier.delete.fail": {
    messageTranslationKey: "identifierDeleteFail",
    type: "warning",
  },
  "patient.team.assign.add.success": {
    messageTranslationKey: "professionalAddedSuccessfully",
    type: "success",
  },
  "patient.team.assign.update.success": {
    messageTranslationKey: "professionalUpdatedSuccessfully",
    type: "success",
  },
  "single.patient.details.save.success": {
    messageTranslationKey: "singlePatientDetailsSaveSuccess",
    type: "success",
  },
  "single.patient.details.save.fail": {
    messageTranslationKey: "singlePatientDetailsSaveFail",
    type: "warning",
  },
  "user.password.resetsuccess": {
    messageTranslationKey: "userPasswordResetSuccess",
    type: "success",
  },
  "user.user.notexist": {
    messageTranslationKey: "userNotexist",
    type: "warning",
  },
  "user.mandatory.details.notfound": {
    messageTranslationKey: "userMandatoryDetailsNotfound",
    type: "warning",
  },
  "user.password.week": {
    messageTranslationKey: "userPasswordWeek",
    type: "warning",
  },
  "user.password.short": {
    messageTranslationKey: "userPasswordShort",
    type: "warning",
  },

  "establishmentlistitem.add.success": {
    messageTranslationKey: "listItemAdded",
    type: "success",
  },
  "establishmentlistitemjson.not.presesnt": {
    messageTranslationKey: "eliAddFail",
    type: "warning",
  },
  "user.photo.uploaded": {
    messageTranslationKey: "userPhotoUploadSuccess",
    type: "success",
  },
  "user.photo.upload.fail": {
    messageTranslationKey: "userPhotoUploadFail",
    type: "warning",
  },

  "establishment.list.item.update.success": {
    messageTranslationKey: "listItemUpdated",
    type: "success",
  },
  "establishment.list.item.update.fail": {
    messageTranslationKey: "eliUpdateFail",
    type: "warning",
  },
  "establishmentlistitem.is.already.present": {
    messageTranslationKey: "eliListFail",
    type: "warning",
  },
  "establishmentlistitem.get.success": {
    messageTranslationKey: "eliSuccess",
    type: "success",
  },
  "establishmentlistitem.notfound": {
    messageTranslationKey: "eliNotFound",
    type: "warning",
  },
  "establishmentlistitem.get.failed": {
    messageTranslationKey: "eliFail",
    type: "warning",
  },
  "user.signature.found": {
    messageTranslationKey: "signSuccess",
    type: "success",
  },
  "user.create.fail.alreadyexists": {
    messageTranslationKey: "userAlreadyExists",
    type: "warning",
  },

  "user.failedtoadd.maxusersreached": {
    messageTranslationKey: "userLimitExceed",
    type: "warning",
  },

  "user.create.fail": {
    messageTranslationKey: "userCreateFail",
    type: "warning",
  },

  "user.create.fail.cliidempty": {
    messageTranslationKey: "userCreateCliidemptyFail",
    type: "warning",
  },
  "hp.leave.success": {
    messageTranslationKey: "hpLeaveSuccess",
    type: "success",
  },
  "establishmentlistitem.appname.not.present": {
    messageTranslationKey: "appNameMissing",
    type: "warning",
  },
  "establishmentlistitem.elitext.not.presesnt": {
    messageTranslationKey: "textMissing",
    type: "warning",
  },
  "user.change.password.success": {
    messageTranslationKey: "changeUserPasswordSuccess",
    type: "success",
  },
  "user.password.notmatched": {
    messageTranslationKey: "changeUserPasswordNotmatched",
    type: "warning",
  },
  "change.user.password.fail": {
    messageTranslationKey: "changeUserPasswordFail",
    type: "warning",
  },
  "user.password.worst": {
    messageTranslationKey: "userPasswordWorst",
    type: "warning",
  },
  "appointment.calendar.block.slot.success": {
    messageTranslationKey: "blockSlotSuccess",
    type: "success",
  },

  "appointment.calendar.block.slot.deleted": {
    messageTranslationKey: "blockSlotDeleteSuccess",
    type: "success",
  },
  "appointment.calendar.block.slot.fail.delete": {
    messageTranslationKey: "blockSlotDeleteFail",
    type: "warning",
  },
  "appointment.calendar.block.slot.notfound": {
    messageTranslationKey: "blockSlotNotFound",
    type: "warning",
  },
};

export default responseCodeMessages;
