export interface TranslationDict {
  nav: {
    story: string;
    vision: string;
    activities: string;
    projects: string;
    events: string;
    gallery: string;
    volunteer: string;
    donate: string;
    language: string;
    langCode: string;
  };
  hero: {
    tagline: string;
    title: string;
    subtext: string;
    donateBtn: string;
    viewBtn: string;
    meals: string;
    children: string;
    audited: string;
  };
  about: {
    label: string;
    title: string;
    timeline: string;
    p1: string;
    p2: string;
    quote: string;
    quoteAuthor: string;
    trustDesc: string;
    leadershipTitle: string;
    leadershipSub: string;
    leaders: {
      name: string;
      role: string;
      bio: string;
    }[];
  };
  vision: {
    label: string;
    title: string;
    visionTitle: string;
    visionDesc: string;
    missionTitle: string;
    missionDesc: string;
    goalsTitle: string;
    goals: string[];
  };
  activities: {
    label: string;
    title: string;
    desc: string;
    categories: {
      all: string;
      nutrition: string;
      education: string;
      healthcare: string;
    };
    noItems: string;
  };
  projects: {
    label: string;
    title: string;
    desc: string;
    status: {
      all: string;
      planned: string;
      active: string;
      completed: string;
    };
    noItems: string;
    timeline: string;
  };
  events: {
    label: string;
    title: string;
    desc: string;
    published: string;
    readMore: string;
    backBtn: string;
    noItems: string;
  };
  gallery: {
    label: string;
    title: string;
    desc: string;
    categories: {
      all: string;
      drives: string;
      tuition: string;
      medical: string;
      distribution: string;
    };
  };
  volunteer: {
    label: string;
    title: string;
    desc: string;
    formTitle: string;
    fields: {
      name: string;
      phone: string;
      email: string;
      city: string;
      occupation: string;
      interests: string;
      message: string;
    };
    interestOptions: {
      nutrition: string;
      education: string;
      healthcare: string;
      admin: string;
    };
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    anotherBtn: string;
    portalLink: string;
    portalDesc: string;
  };
  volunteerDashboard: {
    title: string;
    subtitle: string;
    loginCardTitle: string;
    emailLabel: string;
    phoneLabel: string;
    loginBtn: string;
    loggingIn: string;
    profileTitle: string;
    statusLabel: string;
    statusValues: {
      pending: string;
      approved: string;
      rejected: string;
    };
    assignedTitle: string;
    noAssignment: string;
    logoutBtn: string;
  };
  donation: {
    label: string;
    title: string;
    desc: string;
    activeTitle: string;
    completedTitle: string;
    noActive: string;
    goal: string;
    raised: string;
    remaining: string;
    donateBtn: string;
    funded: string;
  };
}

export const translations: Record<'en' | 'mr', TranslationDict> = {
  en: {
    nav: {
      story: 'Our Story',
      vision: 'Vision & Mission',
      activities: 'Activities',
      projects: 'Projects',
      events: 'Events & News',
      gallery: 'Gallery',
      volunteer: 'Volunteer',
      donate: 'Donate Now',
      language: 'English',
      langCode: 'EN',
    },
    hero: {
      tagline: 'Prathana Foundation · Solapur',
      title: 'Every child deserves a full stomach & an open book.',
      subtext: 'Creating a permanent home, quality education, and dignified care for orphaned children and homeless seniors in Solapur. Built on trust, compassion, and complete transparency.',
      donateBtn: 'Donate Securely',
      viewBtn: 'View Campaigns',
      meals: 'Meals Served',
      children: 'Children Helped',
      audited: 'Audited Funds',
    },
    about: {
      label: 'Our Story',
      title: 'From Tragedy to a Mission of Hope.',
      timeline: 'Our Milestones',
      p1: "Prathana Foundation was born from pain, resilience, and an unwavering commitment to ensure that no child faces the hardships that once changed a young boy's life. Founded in 2018 by Prasad Mohite and Anu Mohite, the foundation began as a promise. Prasad, a farmer's son from Irlewadi in Barshi Taluka, Maharashtra, lost his father to suicide in 2006 due to agricultural debt—a tragedy that thousands of rural families face. Out of this pain came a lifetime mission of hope.",
      p2: "Prasad and Anu met during their Master of Social Work (MSW) studies, united by a common vision of helping street children trapped in begging. Their commitment eventually led to marriage, building a shared mission. Naming the foundation carried a deeply personal story: they had decided to name a daughter 'Prathana'. When she tragically passed away shortly after birth, they chose to donate her body and keep her memory alive by naming their organization Prathana Foundation. Today, the foundation supports 45 children at Prathana Balgram and 25 senior citizens at Prathana Old Age Home.",
      quote: "Humanity is the True Religion.",
      quoteAuthor: "Motto, Prathana Foundation",
      trustDesc: "To build a permanent home for children rescued from streets and farmer-suicide families, Prasad Mohite sold his own family's agricultural land to buy land at Morvanchi village, Mohol. This is now the home of Prathana Balgram and Prathana Old Age Home, creating an intergenerational environment of dignity.",
      leadershipTitle: 'Our Founders',
      leadershipSub: 'The driving force behind Prathana Foundation, transforming personal tragedy into a force for good.',
      leaders: [
        {
          name: 'Prasad Mohite',
          role: 'Founder & President',
          bio: 'Pursued MSW to serve marginalized communities. Set up Vanchitanchi Shala and sold his family land to build a permanent campus for Balgram in Morvanchi, Solapur.',
        },
        {
          name: 'Anu Mohite',
          role: 'Secretary & Co-Founder',
          bio: 'Met Prasad during MSW studies. Together they dedicated their lives to street children, abandoned senior citizens, and natural farming.',
        },
      ],
    },
    vision: {
      label: 'Purpose & Drive',
      title: 'Our Path Forward.',
      visionTitle: 'Our Vision',
      visionDesc: 'To build a compassionate and inclusive society where every vulnerable child, elderly person, and marginalized individual can live with dignity, opportunity, and self-reliance.',
      missionTitle: 'Our Mission',
      missionDesc: 'To empower vulnerable children, elderly persons, and underserved communities through care, education, sustainable livelihoods, youth development, environmental stewardship, and disaster response, enabling them to lead dignified and self-reliant lives.',
      goalsTitle: 'Our Core Values',
      goals: [
        'Compassion: Leading all actions with empathy and heart-centered service to marginalized individuals.',
        'Integrity: Absolute transparency in donations, operations, and community trust.',
        'Sustainability: Empowering self-reliance through natural farming and life-skills education.',
        'Learning: Promoting character-building and interactive learning for youth and children.',
        'Inclusion: Creating an open family environment that leaves no child or senior citizen behind.',
        'Dignity for All: Respecting and honoring every individual\'s right to live with self-worth.',
      ],
    },
    activities: {
      label: 'Direct Relief',
      title: 'Outreach Activities.',
      desc: 'Our ground coordinators execute daily, weekly, and dynamic relief programs inside Solapur. Explore our ongoing outreach channels.',
      categories: {
        all: 'All Activities',
        nutrition: 'Meals & Nutrition',
        education: 'Education Support',
        healthcare: 'Mobile Clinics',
      },
      noItems: 'No activities found in this category.',
    },
    projects: {
      label: 'Strategic Work',
      title: 'Ongoing Projects.',
      desc: 'Targeted missions with set timelines, focusing on building infrastructure and structural relief support systems in Solapur.',
      status: {
        all: 'All Statuses',
        planned: 'Planned',
        active: 'Active',
        completed: 'Completed',
      },
      noItems: 'No projects found matching this status.',
      timeline: 'Project Timeline',
    },
    events: {
      label: 'Newsroom',
      title: 'Updates & Announcements.',
      desc: 'Stay informed with direct logs, announcements, and press publications documenting our Solapur field campaigns.',
      published: 'Published on',
      readMore: 'Read Full Post',
      backBtn: 'Back to News',
      noItems: 'No news posts found.',
    },
    gallery: {
      label: 'Stories in Pictures',
      title: 'Glimpses of Ground Work.',
      desc: 'Real photos, real smiles. We capture regular photos from our field activities to keep our supporters updated and connected.',
      categories: {
        all: 'All Pictures',
        drives: 'Nutrition Drives',
        tuition: 'Tuition Hubs',
        medical: 'Health Camps',
        distribution: 'Kit Distributions',
      },
    },
    volunteer: {
      label: 'Join The Cause',
      title: 'Register as Volunteer.',
      desc: 'We are constantly looking for weekend chefs, tuition teachers, clinical assistants, and dispatch coordinators in Solapur. Fill in your details below.',
      formTitle: 'Volunteer Application Form',
      fields: {
        name: 'Your Name',
        phone: 'Phone Number',
        email: 'Email Address',
        city: 'Your City',
        occupation: 'Your Occupation',
        interests: 'Areas of Interest',
        message: 'Statement of Intent / Message',
      },
      interestOptions: {
        nutrition: 'Meals Cooking & Packing',
        education: 'After-school Tutoring',
        healthcare: 'Medical Camp Coordination',
        admin: 'Logistics & Tech Management',
      },
      submitBtn: 'Submit Application',
      submitting: 'Transmitting application details...',
      successTitle: 'Application Logged Successfully!',
      successDesc: 'Thank you for stepping forward. Our Solapur field coordinator will review your application and contact you via phone or email within 48 hours.',
      anotherBtn: 'Submit Another Application',
      portalLink: 'Volunteer Portal Gateway',
      portalDesc: 'Already registered? Login here to check application status or view your assigned tasks.',
    },
    volunteerDashboard: {
      title: 'Volunteer Portal',
      subtitle: 'Track your profile status and assigned tasks in Solapur outreach',
      loginCardTitle: 'Volunteer Identity Verification',
      emailLabel: 'Registered Email',
      phoneLabel: 'Registered Phone',
      loginBtn: 'Verify Identity & Login',
      loggingIn: 'Verifying credentials...',
      profileTitle: 'Volunteer Profile',
      statusLabel: 'Application Status',
      statusValues: {
        pending: 'Pending Coordinator Review',
        approved: 'Approved & Active',
        rejected: 'Application Deferred',
      },
      assignedTitle: 'Your Assigned Activities',
      noAssignment: 'You have not been assigned to any active field tasks yet. The Solapur coordinator will update this when a drive matches your profile.',
      logoutBtn: 'Disconnect Session',
    },
    donation: {
      label: 'Direct Relief',
      title: 'Active Relief Campaigns.',
      desc: 'Choose a campaign close to your heart. Every rupee raised is tracked transparently. You can witness live progress updates immediately after your checkout completes.',
      activeTitle: 'Ongoing Campaigns',
      completedTitle: 'Fulfilled Missions',
      noActive: 'All campaigns are successfully funded! Thank you for your support.',
      goal: 'Goal Target',
      raised: 'Raised Amount',
      remaining: 'Remaining Need',
      donateBtn: 'Donate to Campaign',
      funded: 'funded',
    },
  },
  mr: {
    nav: {
      story: 'आमची कथा',
      vision: 'ध्येय आणि उद्दिष्टे',
      activities: 'उपक्रम',
      projects: 'प्रकल्प',
      events: 'घडामोडी आणि बातम्या',
      gallery: 'चित्रदालन',
      volunteer: 'स्वयंसेवक',
      donate: 'आता मदत करा',
      language: 'मराठी',
      langCode: 'MR',
    },
    hero: {
      tagline: 'प्रार्थना फाउंडेशन · सोलापूर',
      title: 'प्रत्येक मुलाला पोटभर जेवण आणि शिक्षणाची संधी मिळायला हवी.',
      subtext: 'अनाथ बालकांना हक्काचे घर, दर्जेदार शिक्षण आणि निराधारांना सन्मानाचा आसरा देणारा सोलापूरमधील आपुलकीचा निवारा. पूर्ण पारदर्शकता, निष्ठा आणि मानवतेच्या तत्त्वावर आधारित अविरत सेवाकार्य.',
      donateBtn: 'सुरक्षित देणगी द्या',
      viewBtn: 'मोहिमा पहा',
      meals: 'दिलेले जेवण',
      children: 'मदत केलेली मुले',
      audited: 'पारदर्शक निधी',
    },
    about: {
      label: 'आमची कथा',
      title: 'दुःखातून आशेच्या किरणाकडे.',
      timeline: 'आमचे टप्पे',
      p1: "प्रार्थना फाउंडेशनची निर्मिती दुःख, संघर्ष आणि हक्काचे जीवन देण्याच्या दृढ निश्चयातून झाली. २०१८ मध्ये श्री. प्रसाद मोहिते आणि सौ. अनू मोहिते यांनी या संस्थेची स्थापना केली. २००६ मध्ये, बार्शी तालुक्यातील इर्लेवाडी येथील शेतकरी कुटुंबातील प्रसाद यांच्या वडिलांनी शेतीचे कर्ज आणि आर्थिक विवंचनेमुळे आत्महत्या केली. या आघातातून प्रसाद यांनी स्वतःशी वचन दिले की जे दुःख त्यांच्या कुटुंबाने भोगले ते इतर कोणत्या वंचिताच्या नशिबी येऊ नये.",
      p2: "प्रसाद आणि अनू यांची भेट त्यांच्या एम.एस.डब्ल्यू. (MSW) शिक्षणादरम्यान झाली. सोलापूरच्या रस्त्यावर भीक मागणाऱ्या आणि उपेक्षित मुलांसाठी त्यांनी एकत्र काम सुरू केले. पुढे त्यांनी आंतरजातीय विवाह करून समाजसेवेचा नवा संसार सुरू केला. 'प्रार्थना' हे नाव त्यांच्या वैयक्तिक आयुष्याशी जोडलेले आहे - त्यांच्या जन्मानंतर लगेचच वारलेल्या मुलीचे नाव त्यांनी प्रार्थना ठरवले होते. दुःखद निधनानंतर त्यांनी मुलीचे देहदान केले आणि तिच्या स्मृती जिवंत ठेवण्यासाठी या संस्थेचे नाव 'प्रार्थना फाउंडेशन' ठेवले. आज संस्थेच्या माध्यमातून मोरवंची येथे बालग्राममध्ये ४५ मुले आणि वृद्धाश्रमात २५ वृद्ध राहत आहेत.",
      quote: "मानुसकी हाच खरा धर्म.",
      quoteAuthor: "ध्येयवाक्य, प्रार्थना फाउंडेशन",
      trustDesc: "बालग्रामच्या हक्काच्या जागेसाठी प्रसाद मोहिते यांनी स्वतःची शेतजमीन विकून सोलापूर जिल्ह्यातील मोरवंची (मोहोळ) येथे जागा घेतली. आज तिथे बालग्राम आणि वृद्धाश्रम उभे असून, मुले आणि वृद्ध एकत्रपणे एका कुटुंबासारखे सन्मानाने राहत आहेत.",
      leadershipTitle: 'आमचे संस्थापक',
      leadershipSub: 'वैयक्तिक दुःख बाजूला सारून शेकडो निराधार आणि अनाथ बालकांना मायेची सावली देणारे दांपत्य.',
      leaders: [
        {
          name: 'प्रसाद मोहिते',
          role: 'संस्थापक आणि अध्यक्ष',
          bio: 'MSW पदवीधर. सोलापूरच्या रस्त्यावरील मुलांसाठी वंचितांची शाळा सुरू केली आणि स्वतःची वडिलोपार्जित जमीन विकून मोरवंची येथे बालग्राम व वृद्धाश्रम उभे केले.',
        },
        {
          name: 'अनू मोहिते',
          role: 'सचिव आणि सह-संस्थापक',
          bio: 'पती प्रसाद यांच्यासोबत सामाजिक ध्येय स्वीकारून निराधार बालके, वृद्ध यांच्या संगोपनात आणि नैसर्गिक शेतीमध्ये स्वतःला झोकून दिले.',
        },
      ],
    },
    vision: {
      label: 'उद्देश आणि प्रेरणा',
      title: 'आमची वाटचाल.',
      visionTitle: 'आमचे ध्येय',
      visionDesc: 'एक असा संवेदनशील आणि सर्वसमावेशक समाज निर्माण करणे जिथे प्रत्येक वंचित बालक, वृद्ध आणि उपेक्षित व्यक्ती सन्मानाने, संधीसह आणि स्वावलंबनाने जगू शकेल.',
      missionTitle: 'आमचे उद्दिष्ट',
      missionDesc: 'काळजी, शिक्षण, शाश्वत उपजीविका, युवा विकास, पर्यावरण संवर्धन आणि आपत्ती व्यवस्थापनाच्या माध्यमातून वंचित मुले, वृद्ध आणि दुर्बल घटकांना सक्षम करणे, जेणेकरून ते स्वावलंबी जीवन जगू शकतील.',
      goalsTitle: 'आमची मुख्य मूल्ये',
      goals: [
        'करुणा (Compassion): उपेक्षित आणि गरजू व्यक्तींसाठी सहानुभूतीने आणि सेवाभावाने काम करणे.',
        'प्रामाणिकपणा (Integrity): देणगी, कारभार आणि सामाजिक विश्वासामध्ये पूर्ण पारदर्शकता ठेवणे.',
        'शाश्वतता (Sustainability): नैसर्गिक शेती आणि कौशल्य शिक्षणाद्वारे स्वावलंबन वाढवणे.',
        'ज्ञानार्जन (Learning): युवक आणि मुलांमध्ये चारित्र्यनिर्मिती आणि परस्परसंवादी शिक्षणाला प्रोत्साहन देणे.',
        'समावेशकता (Inclusion): जात, धर्म किंवा आर्थिक भेद विसरून सर्वांना सामावून घेणारे कौटुंबिक वातावरण देणे.',
        'सर्वांसाठी सन्मान (Dignity for All): प्रत्येक व्यक्तीला स्वाभिमानाने आणि स्वावलंबनाने जगण्याचा अधिकार देणे.',
      ],
    },
    activities: {
      label: 'थेट मदत',
      title: 'आमचे उपक्रम.',
      desc: 'आमचे कार्यकर्ते सोलापूरमध्ये दररोज, दर आठवड्याला विविध सेवा उपक्रम राबवतात. आमच्या ongoing सेवा कार्याविषयी माहिती घ्या.',
      categories: {
        all: 'सर्व उपक्रम',
        nutrition: 'पोषण व आहार',
        education: 'शिक्षण मदत',
        healthcare: 'आरोग्य शिबिरे',
      },
      noItems: 'या श्रेणीत कोणतेही उपक्रम आढळले नाहीत.',
    },
    projects: {
      label: 'नियोजित कार्य',
      title: 'चालू प्रकल्प.',
      desc: 'सोलापूरमध्ये पायाभूत सुविधा आणि संरचनात्मक मदत प्रणाली उभारण्यावर भर देणारे निश्चित मुदतीचे प्रकल्प.',
      status: {
        all: 'सर्व प्रकल्प',
        planned: 'नियोजित',
        active: 'सुरू असलेले',
        completed: 'पूर्ण झालेले',
      },
      noItems: 'या श्रेणीत कोणतेही प्रकल्प आढळले नाहीत.',
      timeline: 'प्रकल्प कालावधी',
    },
    events: {
      label: 'बातम्या',
      title: 'घडामोडी आणि अपडेट्स.',
      desc: 'सोलापूरमधील आमची प्रत्यक्ष मोहीम आणि उपक्रमांचे थेट वृत्तपत्रक आणि प्रसिद्धीपत्रके येथे वाचा.',
      published: 'प्रसिद्धी दिनांक',
      readMore: 'सविस्तर वाचा',
      backBtn: 'बातम्यांकडे मागे',
      noItems: 'कोणतीही बातमी आढळली नाही.',
    },
    gallery: {
      label: 'चित्रांतून कथा',
      title: 'प्रत्यक्ष कामाची क्षणचित्रे.',
      desc: 'प्रत्यक्ष कामातील खरी छायाचित्रे. आमच्या समर्थकांना जोडलेले ठेवण्यासाठी आम्ही नियमितपणे छायाचित्रे प्रसिद्ध करतो.',
      categories: {
        all: 'सर्व चित्रे',
        drives: 'पोषण मोहीम',
        tuition: 'अभ्यास वर्ग',
        medical: 'आरोग्य शिबिरे',
        distribution: 'साहित्य वाटप',
      },
    },
    volunteer: {
      label: 'सहभागी व्हा',
      title: 'स्वयंसेवक नोंदणी.',
      desc: 'आम्हाला सोलापूरमध्ये जेवण बनवणारे, शिकवणारे शिक्षक आणि व्यवस्थापन सांभाळणाऱ्या स्वयंसेवकांची गरज आहे. खालील फॉर्म भरा.',
      formTitle: 'स्वयंसेवक अर्ज फॉर्म',
      fields: {
        name: 'तुमचे नाव',
        phone: 'फोन नंबर',
        email: 'ईमेल पत्ता',
        city: 'तुमचे शहर',
        occupation: 'तुमचा व्यवसाय',
        interests: 'आवडीचे क्षेत्र',
        message: 'सहभागी होण्याचा उद्देश / संदेश',
      },
      interestOptions: {
        nutrition: 'अन्न शिजवणे व पॅक करणे',
        education: 'शाळकरी मुलांना शिकवणे',
        healthcare: 'आरोग्य शिबिरांचे नियोजन',
        admin: 'वाहतूक व तंत्रज्ञान व्यवस्थापन',
      },
      submitBtn: 'अर्ज दाखल करा',
      submitting: 'माहिती पाठवली जात आहे...',
      successTitle: 'अर्ज यशस्वीरित्या दाखल झाला!',
      successDesc: 'पुढे येण्यासाठी धन्यवाद. आमचे समन्वयक तुमच्या अर्जाचे पुनरावलोकन करतील आणि ४८ तासांच्या आत फोन किंवा ईमेलद्वारे संपर्क करतील.',
      anotherBtn: 'नवीन अर्ज करा',
      portalLink: 'स्वयंसेवक पोर्टल गेटवे',
      portalDesc: 'आधीच नोंदणी केली आहे? अर्जाची स्थिती किंवा नेमलेली कामे पाहण्यासाठी येथे लॉगिन करा.',
    },
    volunteerDashboard: {
      title: 'स्वयंसेवक पोर्टल',
      subtitle: 'सोलापूर सेवा कार्यातील तुमच्या अर्जाची स्थिती आणि नेमलेली कामे पहा',
      loginCardTitle: 'स्वयंसेवक ओळख पडताळणी',
      emailLabel: 'नोंदणीकृत ईमेल',
      phoneLabel: 'नोंदणीकृत फोन',
      loginBtn: 'ओळख पडताळून लॉगिन करा',
      loggingIn: 'तपासणी सुरू आहे...',
      profileTitle: 'स्वयंसेवक प्रोफाईल',
      statusLabel: 'अर्जाची स्थिती',
      statusValues: {
        pending: 'समन्वयकांच्या पुनरावलोकनाची प्रतीक्षा',
        approved: 'मंजूर आणि सक्रिय',
        rejected: 'अर्ज राखून ठेवला',
      },
      assignedTitle: 'नेमलेले सेवा कार्य',
      noAssignment: 'तुम्हाला अद्याप कोणतेही काम नेमण्यात आलेले नाही. सोलापूर समन्वयक योग्य मोहीम सुरू झाल्यावर येथे माहिती अपडेट करतील.',
      logoutBtn: 'सत्र समाप्त करा',
    },
    donation: {
      label: 'थेट मदत',
      title: 'सक्रिय सेवा मोहिमा.',
      desc: 'तुमच्या मनाला भावणारा उपक्रम निवडा. प्रत्येक रुपयाचा वापर पारदर्शकपणे केला जातो. पेमेंट यशस्वी झाल्यावर मोहीम प्रगती त्वरित वाढलेली दिसेल.',
      activeTitle: 'चालू मोहिमा',
      completedTitle: 'यशस्वी मोहिमा',
      noActive: 'सर्व मोहिमांचा उद्दिष्ट निधी यशस्वीरित्या गोळा झाला आहे! मदतीबद्दल धन्यवाद.',
      goal: 'उद्दिष्ट निधी',
      raised: 'गोळा झालेला निधी',
      remaining: 'उर्वरित गरज',
      donateBtn: 'मोहिमेला देणगी द्या',
      funded: 'निधी गोळा',
    },
  },
};
