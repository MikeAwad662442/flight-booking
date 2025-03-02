/*******************************
 * @author: Mike Awad
 * @description: Website Footer
 * =====================
 *
 *
 *
 * [x] Website Links = NavLinkJson
 * [x] Social Media = SocialMediaJson
 * [x] Contact Us = ContactUsJson
 *******************************/

import Image from "next/image";
// ===================== //
// ===== Next-intl ===== //
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
// ===================== //
// ===== Next-intl ===== //
// ===================== //
// ===== shadcn/UI ===== //
// ===================== //
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
// ===== shadcn/UI ===== //
// ===================== //
import {
  ContactUsJson,
  NavBarItemsType,
  NavLinksJson,
  SocialMediaJson,
} from "./NavbarJson";

const Footer = async () => {
  const FooterT = await getTranslations("Navbar");
  const year = new Date().getFullYear();
  return (
    <footer className="flex w-full flex-col items-center justify-between bg-accent-foreground px-8 pb-8 pt-16 text-primary">
      <section className="grid grid-cols-1 items-start justify-center gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo - Info - SocialMediaJson */}
        <div className="flex flex-col items-start justify-start gap-8">
          <Image
            src={`/assets/Logo.jpeg`}
            alt="Logo"
            width={213}
            height={105}
          />
          <p className="break-all">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, accusantium!
          </p>
          <ul className="flex flex-row items-center justify-between gap-8">
            {SocialMediaJson.map((Items: NavBarItemsType) => (
              <li key={Items.label}>
                <Link
                  href={`${Items.href}`}
                  target="_blank"
                  title={Items.label}
                >
                  {Items.icon && <Items.icon />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Company Links */}
        <div className="flex flex-col items-start justify-start gap-4 md:items-center">
          <h2 className="font-bold text-chart-5">{FooterT("Company")}</h2>
          <ul className="flex flex-col items-start justify-start gap-4">
            {NavLinksJson.map((Items: NavBarItemsType) => (
              <li key={Items.label}>
                <Link href={`${Items.href}`}>{FooterT(Items.label)}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* ContactUs */}
        <div className="flex flex-col items-start justify-start gap-4">
          <h2 className="font-bold text-chart-5">{FooterT("ContactUs")}</h2>
          <ul className="flex flex-col items-start justify-start gap-4">
            {ContactUsJson.map((Items: NavBarItemsType) => (
              <li key={Items.label}>
                <Link
                  href={`${Items.href}`}
                  target="_blank"
                  className="flex flex-row gap-4"
                >
                  {Items.icon && <Items.icon />} {Items.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Google Map */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.435182562629!2d35.77268567462801!3d35.51824203891228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1526adb7c4cc3123%3A0xa205710d5e796158!2sM.TECH!5e0!3m2!1sen!2s!4v1740567597730!5m2!1sen!2s"
            width="285"
            height="198"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
      <Separator className="my-4 h-1" />
      <div className="flex w-full flex-row items-center justify-between">
        <div>{FooterT.rich("AllRightsReserved", { YY: `${year}` })}</div>
        <div className="flex flex-row items-center justify-between gap-2">
          <Sheet>
            <SheetTrigger>{FooterT("Terms")}</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{FooterT("Terms")}</SheetTitle>
                <SheetDescription>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolor dolorem, a error, tempora delectus ut aperiam libero
                  ipsam soluta iure aliquid unde consequatur, nulla impedit
                  accusamus rerum consequuntur minima corrupti molestias nemo.
                  Ab earum omnis quam laboriosam, quia necessitatibus alias quos
                  recusandae dolore excepturi, autem eveniet, eius perferendis
                  dolorem qui inventore ipsam quisquam aperiam temporibus
                  doloribus tempore iusto! Delectus ducimus beatae dolorum
                  sapiente quibusdam voluptates porro perferendis ex voluptatum
                  excepturi. Ad cum, facere itaque aspernatur dolore, dicta
                  repellendus explicabo dignissimos tenetur, expedita vel ipsa
                  quidem mollitia accusamus nulla! Sequi doloremque eum
                  aspernatur veniam nulla autem vitae, illo ad quam
                  necessitatibus magni et animi! Dolores aperiam eaque non
                  aliquid accusantium! Nisi, ratione magni! Dolorum excepturi
                  libero delectus quae alias officiis nulla facilis rem odio
                  molestias explicabo praesentium soluta debitis vero quod dicta
                  et sunt accusantium nesciunt fugiat aut iste deleniti,
                  repellendus facere. Id, laudantium mollitia repellendus nam
                  aut libero suscipit deserunt commodi consequatur modi ad?
                  Ratione accusantium, aut alias, molestias consequuntur, magni
                  totam corporis velit repellat quae et id fuga suscipit quas!
                  Maiores odit impedit sed ipsam soluta, officiis, provident
                  excepturi ut quibusdam illo ab? Quas veritatis dicta illo odio
                  quibusdam mollitia sed, neque debitis numquam optio, ut illum
                  suscipit recusandae?
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Separator orientation="vertical" className="w-2" />

          <Sheet>
            <SheetTrigger>{FooterT("PrivacyPolicy")}</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{FooterT("PrivacyPolicy")}</SheetTitle>
                <SheetDescription>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Deserunt consectetur dignissimos tempora reiciendis, vel
                  obcaecati ipsum minima eos reprehenderit vero impedit, vitae
                  repellat magni voluptatem pariatur doloremque nulla, error
                  ullam velit cum explicabo saepe rerum hic nesciunt! Sequi illo
                  sapiente sint nam omnis saepe earum quia et nesciunt in
                  similique porro maxime, harum expedita iure possimus fuga
                  repellendus. Eos vel praesentium quod culpa facilis vero enim
                  nisi animi velit alias libero nostrum error beatae at quia
                  ipsum magnam, reprehenderit molestias rem non veritatis. Nulla
                  iste dolore quam non repellat perspiciatis odit porro
                  consectetur quo sequi voluptates odio itaque, ipsum, suscipit
                  exercitationem aliquam, similique fuga fugit illum animi!
                  Impedit ratione nulla tempora quibusdam dolores vitae
                  temporibus, cum sint error omnis maxime quam praesentium autem
                  hic ut commodi doloremque! Maxime blanditiis similique
                  necessitatibus expedita tenetur obcaecati. Cumque minima illo
                  libero quam, quos velit, porro repudiandae dicta quasi nisi
                  voluptate harum corporis repellendus doloribus cupiditate.
                  Vitae porro enim libero veritatis maiores aspernatur beatae
                  placeat similique, quam cumque necessitatibus officia aut
                  commodi rem neque illum reiciendis eaque quia aliquid iure ad.
                  Error pariatur rem accusamus fugiat, eaque quasi debitis
                  recusandae facilis ex perspiciatis aliquid vel dignissimos,
                  voluptas nobis corporis quidem odio eos reprehenderit. Amet
                  consequuntur veritatis voluptatem, voluptas repudiandae illum
                  neque sequi nobis quia libero iusto? Eveniet accusantium ut
                  amet error? Excepturi, laborum explicabo animi mollitia
                  nostrum illo dignissimos, deleniti unde magnam accusantium
                  optio ex laudantium totam non! Labore voluptate libero,
                  quaerat rem odio minus illo quas itaque commodi aperiam
                  consequatur aliquam tempora dolorum, doloremque impedit vel
                  exercitationem! Modi eveniet mollitia magni accusamus
                  corporis? Est dolore itaque magni cum corrupti doloribus ipsa,
                  non beatae aliquid rem. Ea, est mollitia dolorem temporibus
                  eligendi deserunt magni, porro explicabo necessitatibus cumque
                  hic, labore veritatis assumenda vero alias totam dignissimos
                  sequi deleniti tempore! Ea atque inventore natus impedit ad at
                  ipsam eos! Ullam, quasi sit facere recusandae corporis iste
                  aliquam sed assumenda voluptatum possimus explicabo voluptatem
                  consequatur alias officia pariatur deserunt adipisci amet
                  excepturi ratione aut exercitationem enim cupiditate! Nostrum,
                  velit? Laborum nisi optio et at magni, beatae dolorem facere
                  totam ex necessitatibus alias, labore consequatur a enim quia
                  aut tempore in exercitationem dolorum cum incidunt sed dolore
                  amet? Blanditiis vero architecto possimus dicta excepturi
                  earum fuga ab dolore. Accusantium aliquam architecto commodi
                  unde dicta nisi aperiam deleniti nobis sunt, corrupti
                  molestiae eos perspiciatis recusandae porro excepturi dolore
                  ex cumque. Ipsam fuga rem porro nobis placeat incidunt
                  eligendi ad explicabo sit fugiat optio corrupti error iusto
                  molestias repellendus eveniet repellat, id illum velit,
                  maxime, ullam illo dolore nulla. Ipsum unde harum saepe quam
                  dolores, necessitatibus dicta. Molestias ea temporibus
                  reiciendis dolore culpa ab? Quasi possimus voluptatum ut quam
                  ad unde quas reiciendis enim quaerat, illo aperiam incidunt
                  labore sunt quod exercitationem esse! Mollitia, minus ratione
                  quia voluptatem quae corporis hic assumenda provident vero
                  illo tempora, molestias suscipit alias nam reprehenderit sunt
                  soluta odio laudantium voluptatibus dolore magni! Ex fugit
                  dolorum obcaecati officia id repellendus mollitia perspiciatis
                  soluta, reiciendis, doloribus saepe, ratione esse qui iste
                  velit magnam fuga magni.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
/*******************************
 * Notes:
 * ============================
 *
 *
 *
 *******************************/
