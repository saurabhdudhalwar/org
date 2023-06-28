export const openInNewTab = (url: any, title: any, width: any, height: any) => {
    const horizontalScreen = window.outerHeight / 2 + window.screenY - height / 2;
    const verticalScreen = window.outerWidth / 2 + window.screenX - width / 2;
    return window.open(
      url,
      title,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${horizontalScreen}, left=${verticalScreen}`
    );
  };

