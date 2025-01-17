import { Footer } from "@tradetrust-tt/tradetrust-ui-components";
import { FunctionComponent } from "react";
import { usePersistedConfigFile } from "../../common/hook/usePersistedConfigFile";
import { getNetworkPath } from "../../utils";
import { NavLinkInterface, RenderExternalLink, RenderNavLink, BottomRenderExternalLink } from "./FooterBarLink";

interface footerData {
  category: string;
  items: footerDataItems[];
}

interface footerDataItems {
  label: string;
  to: string;
  render: NavLinkInterface;
}

interface GetDataInterface {
  (networkPath: string): footerData[];
}

const getData: GetDataInterface = () => {
  return [
    {
      category: "Utilities",
      items: [
        { label: "Verify Documents", to: `http://tradetrust-verify.knowledgecatalyst.io`, render: RenderExternalLink },
        { label: "Create Documents", to: "/", render: RenderNavLink },
      ],
    },
    {
      category: "Settings",
      items: [
        { label: "Address Book", to: "/settings/address-book", render: RenderNavLink },
        { label: "Address Book Resolver", to: "/settings/address-resolver", render: RenderNavLink },
      ],
    },
  ];
};

const legalData = (networkPath: string) => {
  return {
    copyright: "Copyright \u00A9 Knowledge Catalyst | Powered by Tradetrust",
    items: [
      { label: "Privacy Policy", to: `${networkPath}/privacy-policy`, render: BottomRenderExternalLink },
      { label: "Terms of use", to: `${networkPath}/terms-of-use`, render: BottomRenderExternalLink },
    ],
  };
};

export const FooterBar: FunctionComponent = () => {
  const { configFile } = usePersistedConfigFile();
  const networkPath = getNetworkPath(configFile?.network) || "https://knowledgecatalyst.io";
  const data = getData(networkPath);

  return (
    <div className="bg-cerulean-50 pt-8">
      <Footer
        className="bg-white py-8 px-6"
        logoUrl={"/knowledgecatalyst-logo-black.webp"}
        legalData={legalData(networkPath)}
        data={data}
      />
    </div>
  );
};
