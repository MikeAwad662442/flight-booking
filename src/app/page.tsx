/*******************************
 * @author: Mike Awad
 * @description: Root Page
 * =====================
 *******************************/
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
/*******************************
 * Notes:
 * =====================
 * Redirect to Locale Folder then www layout
 *******************************/
