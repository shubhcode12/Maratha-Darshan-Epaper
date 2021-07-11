module.exports = {
  title: "Maratha Darshan",
  description: "A Maratha Darshan E-Newspaper website made by Aadvaith Consultancy.",
  keywords: "enewspaper, Aadvaith Consultancy, pathetic_geek, shubhcode",
  logo: "/logo.png",
  menu: [
    { text: "Home", to: "/" },
    { text: "Search", to: "/search" },
    //{ text: "Blog", to: "/blog" },
    { text: "About", to: "/about" },
    { text: "Contact", to: "/contact" },
    { text: "Privacy Policy", to: "/privacypolicy" },
    //{ text: "Terms", to: "/terms" },
  ],
  googleAnalyticsId: "",
  firebaseConfig: {
    apiKey: "AIzaSyCsf_MPxhsKtoQ1sF6IkwIu9xHbo63ci1E",
    authDomain: "maratha-darshan-epaper.firebaseapp.com",
    databaseURL: "https://maratha-darshan-epaper-default-rtdb.firebaseio.com",
    projectId: "maratha-darshan-epaper",
    storageBucket: "maratha-darshan-epaper.appspot.com",
    messagingSenderId: "658803069734",
    appId: "1:658803069734:web:7367a7eb8c10e52bce27e7",

  },
  aboutPage: {
    pageTitle: "About Us",
    logo: "/logo.png",
    title: "दै . मराठा दर्शन",
    description: [
      "मुख्य संपादक : नारायण महादेव पानसरे",
      "पत्ता :- छत्रपती शिवाजी नगर, मलकापूर, जिल्हा बुलढाणा, महाराष्ट्र",
    ],
    contactnos: ["+918208162056"],
    emails: ["dmarathadrashan@gmail.com"],
    address: `<ion-icon name="pin"></ion-icon> छत्रपती शिवाजी नगर, मलकापूर, जिल्हा बुलढाणा, \nमहाराष्ट्र`,
  },
  showNewsletter: true,
  socialLinksText: "Follow us on:",
  socialLinks: [
    { icon: "logo-facebook", color: "#3b5998", to: "https://fb.me/abcd" },
    { icon: "logo-youtube", color: "#FF0000", to: "https://youtu.be/asdsad" },
    { icon: "logo-twitter", color: "#1DA1F2", to: "https://youtu.be/asdsad" },
  ],
  privacyPolicy: [
    { title: "Section title", para: "some long para no ones gonna read" },
    { title: "Section title", para: "some long para no ones gonna read" },
    { title: "Section title", para: "some long para no ones gonna read" },
  ],
  terms: [
    { title: "Section title", para: "some long para no ones gonna read" },
    { title: "Section title", para: "some long para no ones gonna read" },
    { title: "Section title", para: "some long para no ones gonna read" },
  ],
  // navAd: "/logo.png",
  // uniqueViewCounter: true,
  wordpressRoot: "",
  postsPerPage: 10,
  blogTitle: "Our blog",
  homeBlogTitle: "Latest news: ",
  WPcategories: [19, 14],
};

/*

  to find ID's of categories to put in WPcategories goto https://youtsite.com/wp-json/wp/v2/categories

   Pages              "to" value
   Home                   /
   Search              /search
   About               /about
   Contact            /contact

    Icon                   Color
logo-twitter              #1DA1F2
logo-facebook             #3b5998
logo-whatsapp             #25D366
logo-youtube              #FF0000
logo-snapchat             #FFFC00
logo-instagram            #E1306C
logo-linkedin             #0077B5
logo-google-playstore     #3BCCFF

*/
