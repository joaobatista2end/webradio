interface Json {
    [key: string]: string | Json | JsonArray;
  }
  
  interface JsonArray extends Array<string | Json | JsonArray> {}
  
  export function xmlToJson(xml: Node): Json | string {
    let obj: Json = {};
  
    if (xml.nodeType === 1) { // element
      // Do attributes
      const element = xml as Element;
      if (element.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let j = 0; j < element.attributes.length; j++) {
          const attribute = element.attributes.item(j);
          if (attribute) {
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      }
    } else if (xml.nodeType === 3) { // text
      return xml.nodeValue || '';
    }
  
    // Do children
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        if (item) {
          const nodeName = item.nodeName;
          if (typeof(obj[nodeName]) === "undefined") {
            obj[nodeName] = xmlToJson(item);
          } else {
            if (!Array.isArray(obj[nodeName])) {
              const old = obj[nodeName];
              obj[nodeName] = [old];
            }
            (obj[nodeName] as JsonArray).push(xmlToJson(item));
          }
        }
      }
    }
    return obj;
  }
  