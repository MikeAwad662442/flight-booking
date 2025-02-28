/*******************************
 * @author: Mike Awad
 * @description: Global Layout
 * =====================
 *******************************/
import "./globals.css";
// import "./style/master.css";
const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
  // return { children };
};

export default RootLayout;
/*******************************
 * Notes:
 * =====================
 * used to send user to Locale Folder
 * to get global Not Found
 *******************************/
