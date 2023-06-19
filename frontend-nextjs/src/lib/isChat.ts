export const isChat = (pathname: string) => {
    const pathComponents = pathname.split("/");
    const newPathComponents = pathComponents.slice(0, -1);
    return newPathComponents.join("/");
  };