new Mongo()

db = connect('mongodb://rocsweb.tekeniko.solutions/rocsDB', "iact_rocs", "I@ct_r0cs");

db.Province.insertMany([
    {
        province: "Copperbelt Province",
        province_code: "COP"
    },
    {
        province: "Central Province",
        province_code: "CEP"
    },
    {
        province: "Eastern Province",
        province_code: "EAP"
    },
    {
        province: "Luapula Province",
        province_code: "LPP"
    },
    {
        province: "Lusaka Province",
        province_code: "LUP"
    },
    {
        province: "Muchinga Province",
        province_code: "MUP"
    },
    {
        province: "North - Western Province",
        province_code: "NWP"
    },
    {
        province: "Northern Province",
        province_code: "NOP"
    },
    {
        province: "Southern Province",
        province_code: "SOP"
    },
    {
        province: "Western Province",
        province_code: "WEP"
    }
]);

db.District.insertMany([
    {
        district: "Chibombo",
        province_code: "CEP"
    },
    {
        district: "Chisamba",
        province_code: "CEP"
    },
    {
        district: "Chitambo",
        province_code: "CEP"
    },
    {
        district: "Itezhi Tezhi",
        province_code: "CEP"
    },
    {
        district: "Kabwe",
        province_code: "CEP"
    },
    {
        district: "Kapiri Mposhi",
        province_code: "CEP"
    },
    {
        district: "Luano",
        province_code: "CEP"
    },
    {
        district: "Mkushi",
        province_code: "CEP"
    },
    {
        district: "Mumbwa",
        province_code: "CEP"
    },
    {
        district: "Ngabwe",
        province_code: "CEP"
    },
    {
        district: "Serenje",
        province_code: "CEP"
    },
    {
        district: "Chililabombwe",
        province_code: "COP"
    },
    {
        district: "Chingola",
        province_code: "COP"
    },
    {
        district: "Kalulushi",
        province_code: "COP"
    },
    {
        district: "Kitwe",
        province_code: "COP"
    },
    {
        district: "Luanshya",
        province_code: "COP"
    },
    {
        district: "Lufwanyama",
        province_code: "COP"
    },
    {
        district: "Masaiti",
        province_code: "COP"
    },
    {
        district: "Mpongwe",
        province_code: "COP"
    },
    {
        district: "Mufulira",
        province_code: "COP"
    },
    {
        district: "Ndola",
        province_code: "COP"
    },
    {
        district: "Chadiza",
        province_code: "EAP"
    },
    {
        district: "Chipata",
        province_code: "EAP"
    },
    {
        district: "Katete",
        province_code: "EAP"
    },
    {
        district: "Lundazi",
        province_code: "EAP"
    },
    {
        district: "Mambwe",
        province_code: "EAP"
    },
    {
        district: "Nyimba",
        province_code: "EAP"
    },
    {
        district: "Petauke",
        province_code: "EAP"
    },
    {
        district: "Sinda",
        province_code: "EAP"
    },
    {
        district: "Vubwi",
        province_code: "EAP"
    },
    {
        district: "Chembe",
        province_code: "LPP"
    },
    {
        district: "Chiengi",
        province_code: "LPP"
    },
    {
        district: "Chipili",
        province_code: "LPP"
    },
    {
        district: "Kawambwa",
        province_code: "LPP"
    },
    {
        district: "Lunga",
        province_code: "LPP"
    },
    {
        district: "Mansa",
        province_code: "LPP"
    },
    {
        district: "Milengi",
        province_code: "LPP"
    },
    {
        district: "Mwansabombwe",
        province_code: "LPP"
    },
    {
        district: "Mwense",
        province_code: "LPP"
    },
    {
        district: "Nchelenge",
        province_code: "LPP"
    },
    {
        district: "Samfya",
        province_code: "LPP"
    },
    {
        district: "Chilanga",
        province_code: "LUP"
    },
    {
        district: "Chirundu",
        province_code: "LUP"
    },
    {
        district: "Chongwe",
        province_code: "LUP"
    },
    {
        district: "Kafue",
        province_code: "LUP"
    },
    {
        district: "Luangwa",
        province_code: "LUP"
    },
    {
        district: "Lusaka",
        province_code: "LUP"
    },
    {
        district: "Rufunsa",
        province_code: "LUP"
    },
    {
        district: "Shibuyunji",
        province_code: "LUP"
    },
    {
        district: "Chama",
        province_code: "MUP"
    },
    {
        district: "Chinsali",
        province_code: "MUP"
    },
    {
        district: "Chilinda",
        province_code: "MUP"
    },
    {
        district: "Isoka",
        province_code: "MUP"
    },
    {
        district: "Kanchibiya",
        province_code: "MUP"
    },
    {
        district: "Lavushimanda",
        province_code: "MUP"
    },
    {
        district: "Mafinga",
        province_code: "MUP"
    },
    {
        district: "Mpika",
        province_code: "MUP"
    },
    {
        district: "Nakonde",
        province_code: "MUP"
    },
    {
        district: "Shiwang'andu",
        province_code: "MUP"
    },
    {
        district: "Chilubi",
        province_code: "NOP"
    },
    {
        district: "Kaputa",
        province_code: "NOP"
    },
    {
        district: "Kasama",
        province_code: "NOP"
    },
    {
        district: "Lunte",
        province_code: "NOP"
    },
    {
        district: "Luwingu",
        province_code: "NOP"
    },
    {
        district: "Mbala",
        province_code: "NOP"
    },
    {
        district: "Mporokoso",
        province_code: "NOP"
    },
    {
        district: "Mpulungu",
        province_code: "NOP"
    },
    {
        district: "Mungwi",
        province_code: "NOP"
    },
    {
        district: "Nsama",
        province_code: "NOP"
    },
    {
        district: "Senga",
        province_code: "NOP"
    },
    {
        district: "Chavuma",
        province_code: "NWP"
    },
    {
        district: "Ikelenge",
        province_code: "NWP"
    },
    {
        district: "Kabompo",
        province_code: "NWP"
    },
    {
        district: "Kasempa",
        province_code: "NWP"
    },
    {
        district: "Kalumbila",
        province_code: "NWP"
    },
    {
        district: "Manyinga",
        province_code: "NWP"
    },
    {
        district: "Mufumbwe",
        province_code: "NWP"
    },
    {
        district: "Mushindano",
        province_code: "NWP"
    },
    {
        district: "Mwinilunga",
        province_code: "NWP"
    },
    {
        district: "Solwezi",
        province_code: "NWP"
    },
    {
        district: "Zambezi",
        province_code: "NWP"
    },
    {
        district: "Chikankata",
        province_code: "SOP"
    },
    {
        district: "Choma",
        province_code: "SOP"
    },
    {
        district: "Gwembe",
        province_code: "SOP"
    },
    {
        district: "Kalomo",
        province_code: "SOP"
    },
    {
        district: "Kazungula",
        province_code: "SOP"
    },
    {
        district: "Livingstone",
        province_code: "SOP"
    },
    {
        district: "Mazabuka",
        province_code: "SOP"
    },
    {
        district: "Monze",
        province_code: "SOP"
    },
    {
        district: "Namwala",
        province_code: "SOP"
    },
    {
        district: "Pemba",
        province_code: "SOP"
    },
    {
        district: "Siavonga",
        province_code: "SOP"
    },
    {
        district: "Sinazongwe",
        province_code: "SOP"
    },
    {
        district: "Zimba",
        province_code: "SOP"
    },
    {
        district: "Kalabo",
        province_code: "WEP"
    },
    {
        district: "Kaoma",
        province_code: "WEP"
    },
    {
        district: "Limulunga",
        province_code: "WEP"
    },
    {
        district: "Luampa",
        province_code: "WEP"
    },
    {
        district: "Lukulu",
        province_code: "WEP"
    },
    {
        district: "Mitete",
        province_code: "WEP"
    },
    {
        district: "Mongu",
        province_code: "WEP"
    },
    {
        district: "Mulobezi",
        province_code: "WEP"
    },
    {
        district: "Mwandi",
        province_code: "WEP"
    },
    {
        district: "Nalolo",
        province_code: "WEP"
    },
    {
        district: "Nkeyema",
        province_code: "WEP"
    },
    {
        district: "Senanga",
        province_code: "WEP"
    },
    {
        district: "Sesheke",
        province_code: "WEP"
    },
    {
        district: "Shang'ombo",
        province_code: "WEP"
    },
    {
        district: "Sikongo",
        province_code: "WEP"
    },
    {
        district: "Sioma",
        province_code: "WEP"
    }
]);