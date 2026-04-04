const mongoose = require("mongoose");
require("dotenv").config();

const Post = require("./models/Post");

const blogPosts = [
  {
    title: "The Future of Artificial Intelligence in Everyday Life",
    description:
      "Explore how artificial intelligence is transforming daily routines, workplaces, healthcare, and the future of modern society.",
    content: `
Artificial Intelligence (AI) is no longer just a futuristic idea discussed in science fiction movies or research laboratories. Today, it has become a practical part of daily life and continues to change how people live, work, and communicate. From voice assistants such as Siri and Google Assistant to recommendation systems on Netflix, TikTok, and YouTube, AI is already deeply integrated into common digital experiences.

One of the strongest impacts of AI can be seen in automation. Businesses use AI tools to handle repetitive tasks such as answering customer questions, sorting data, detecting spam emails, and generating reports. This helps organisations improve efficiency and save time. Instead of spending hours on repetitive work, employees can focus on more important responsibilities that require human creativity, empathy, or critical thinking.

AI is also changing healthcare in meaningful ways. Machine learning systems can analyse medical images, identify patterns in test results, and help doctors detect diseases earlier. In some cases, AI can support diagnosis by recognising details that may be missed during manual review. This does not replace doctors, but it can improve speed and accuracy in medical decision-making.

Another major area where AI plays a role is education. Personalised learning platforms can adapt lessons to different student needs. AI can recommend practice materials, explain concepts in different ways, and provide instant feedback. This creates more flexible learning experiences and can help students improve at their own pace.

However, despite its many benefits, AI also raises serious concerns. Privacy is one of the most important issues, as AI systems often rely on large amounts of personal data. There are also concerns about bias, fairness, and transparency. If an AI model is trained on biased data, it may produce unfair outcomes. In addition, many people worry that automation may reduce job opportunities in some industries.

For this reason, it is important for developers, governments, and organisations to use AI responsibly. Ethical guidelines, data protection laws, and human oversight should remain central as this technology continues to grow. AI has enormous potential, but it must be developed with care.

In conclusion, AI is shaping the modern world in powerful ways. It improves convenience, supports innovation, and offers exciting opportunities across many industries. At the same time, society must address its risks carefully to ensure that AI benefits people in fair, safe, and meaningful ways.
    `,
    category: "AI",
    author: "Admin",
    image:
      "/images/ai.jpg",
    tags: ["AI", "Technology", "Innovation"],
  },
  {
    title: "Understanding Full-Stack Development",
    description:
      "A complete introduction to full-stack development, including frontend, backend, databases, and the skills needed to build modern web applications.",
    content: `
Full-stack development is one of the most valuable and versatile skill sets in the technology industry. A full-stack developer is someone who can work on both the frontend and backend of a web application. In simple terms, this means they are able to build the parts users interact with and also manage the server, database, and application logic behind the scenes.

The frontend is everything users can see and interact with in a browser. It includes layouts, buttons, forms, navigation bars, images, and animations. Frontend developers commonly use HTML, CSS, and JavaScript to build websites. Frameworks and libraries such as React, Vue, and Angular make it easier to create dynamic and responsive user interfaces. A strong frontend should not only look attractive but also provide a smooth and accessible user experience.

The backend is responsible for handling data, authentication, business logic, and communication with the database. Common backend technologies include Node.js, Express.js, Python, PHP, and Java. When a user signs in, submits a form, or requests information from a website, the backend processes that request and returns the correct response. It acts as the core engine of the application.

Databases are another essential part of full-stack development. Developers often work with MongoDB, MySQL, or PostgreSQL depending on project needs. Databases store user information, posts, products, transactions, and any other data the application requires. A full-stack developer needs to understand how to structure, read, update, and delete this data efficiently.

One of the biggest advantages of being a full-stack developer is flexibility. Smaller companies and startups often prefer hiring developers who can contribute across multiple parts of a project. This reduces dependency on large teams and allows faster development cycles. Full-stack developers can also understand how the entire system works together, which improves problem-solving and collaboration.

However, learning full-stack development can be challenging. There are many tools, frameworks, and best practices to understand. Developers must also keep learning because technology changes quickly. New libraries, security practices, and performance techniques appear regularly.

Despite these challenges, full-stack development remains a rewarding path. It opens the door to a wide range of careers in software engineering, web development, and product design. For beginners, learning both frontend and backend basics provides a strong foundation for building complete real-world applications.

In summary, full-stack development is about understanding the complete web development process. It combines creativity on the frontend with logic and structure on the backend, allowing developers to bring ideas to life from start to finish.
    `,
    category: "Web Development",
    author: "Bi",
    image:
      "/images/fullstack.jpg",
    tags: ["Full Stack", "Frontend", "Backend"],
  },
  {
    title: "What is MongoDB and Why Use It?",
    description:
      "Learn what MongoDB is, how it works, and why it is a popular database choice for modern web applications.",
    content: `
MongoDB is one of the most widely used NoSQL databases in modern web development. Unlike traditional relational databases that store data in tables and rows, MongoDB stores data in flexible, JSON-like documents. This structure makes it particularly suitable for modern applications that require scalability, speed, and flexibility.

One of MongoDB's most attractive features is its flexible schema. In relational databases, developers usually need to define a strict schema before storing any data. If the application requirements change later, altering the schema can become complicated. MongoDB solves this issue by allowing developers to store documents with different fields in the same collection. This is useful in projects where data structures may evolve over time.

MongoDB is especially popular in JavaScript-based development environments because it works well with Node.js and Express. Since data is stored in a JSON-like format, it feels natural to use in full-stack JavaScript applications. This reduces the gap between frontend, backend, and database representations, making development faster and more intuitive.

Another major benefit of MongoDB is scalability. It supports horizontal scaling through sharding, which means large applications can distribute data across multiple servers. This is valuable for applications that need to manage growing amounts of traffic and data. Startups and large technology companies alike often choose MongoDB because of its ability to scale effectively.

MongoDB also provides strong performance for many common operations. It is efficient for reading and writing large amounts of data, especially in content-driven applications such as blogs, e-commerce websites, and social platforms. Features such as indexing, aggregation pipelines, and replication make MongoDB a practical database choice for real-world use.

However, MongoDB is not the perfect solution for every case. Some applications require highly complex joins or strict transactional consistency, where relational databases may still be more suitable. Choosing the right database depends on the needs of the project, the structure of the data, and the expected scale of the application.

For beginners, MongoDB is often considered easier to start with than some traditional SQL databases. It is straightforward to create collections, insert documents, and connect with backend applications using tools such as Mongoose. This makes it a common choice for student projects and portfolio websites.

In conclusion, MongoDB is a powerful, flexible, and scalable NoSQL database. Its document-based structure, strong integration with JavaScript, and adaptability make it a popular option for building modern web applications efficiently.
    `,
    category: "Database",
    author: "Admin",
    image:
      "/images/mongodb.jpg",
    tags: ["MongoDB", "Database", "NoSQL"],
  },
  {
    title: "Getting Started with React.js",
    description:
      "A practical beginner guide to React.js, components, state, props, and why React remains a leading frontend library.",
    content: `
React.js is one of the most popular JavaScript libraries for building modern user interfaces. Created by Facebook, React has become a standard tool for frontend development because it allows developers to build fast, interactive, and reusable interface components. Whether you are creating a simple website or a large-scale web application, React offers a structured way to manage the user interface.

One of the main ideas behind React is component-based development. Instead of building one large HTML page, developers split the user interface into smaller reusable pieces called components. For example, a navigation bar, blog card, footer, or login form can each be built as separate components. This makes code easier to organise, maintain, and reuse across pages.

React also introduces the concept of props and state. Props allow data to be passed from one component to another, while state lets a component manage its own changing data. For instance, if a user clicks a button to open a menu or likes a post, React can update only the necessary part of the screen instead of reloading the entire page. This creates a smoother and more efficient user experience.

A key technical benefit of React is the Virtual DOM. Instead of updating the real DOM directly every time data changes, React first updates a lightweight virtual representation and then applies only the required changes to the browser. This improves performance, especially in large or interactive applications.

React is also supported by a large ecosystem of tools and frameworks. Beginners often start with Vite because it provides a fast and simple setup. As developers progress, they may explore React Router for navigation, Context API for state sharing, and libraries such as Axios for API communication. Advanced developers may also use Next.js, which extends React for server-side rendering and better performance.

Learning React is useful because many companies rely on it for real-world products. It is commonly used for dashboards, e-commerce platforms, blogs, management systems, and social media applications. Because of its popularity, React skills are highly valued in the job market.

Although React is powerful, it can feel confusing at first. Beginners often need time to understand JSX, components, hooks, and state flow. However, once these concepts become clear, React becomes an efficient and enjoyable tool for building interfaces.

In summary, React.js is a powerful frontend library that helps developers build modern web applications using reusable components and efficient rendering. It is an excellent starting point for anyone interested in frontend or full-stack development.
    `,
    category: "Frontend",
    author: "Bi",
    image:
      "/images/react-native.jpg",
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    title: "REST API vs GraphQL: Which One to Choose?",
    description:
      "Compare REST API and GraphQL in terms of flexibility, simplicity, performance, and practical use cases in web development.",
    content: `
APIs are essential in modern web development because they allow different systems to communicate with each other. When building applications, developers often need to decide between using REST and GraphQL. Both approaches are widely used, but each has different strengths and trade-offs depending on the project requirements.

REST, or Representational State Transfer, has been the standard approach for building APIs for many years. In a REST API, data is usually accessed through predefined endpoints such as /users, /posts, or /products. Each endpoint returns a fixed structure of data. REST is popular because it is straightforward, well-documented, and easy for teams to understand and maintain.

GraphQL is a newer alternative that gives clients more control over the data they request. Instead of relying on many fixed endpoints, GraphQL typically uses a single endpoint where the client sends a query describing exactly what information it needs. This helps avoid over-fetching, where the API returns extra data, and under-fetching, where multiple requests are needed to collect related data.

One of the greatest advantages of REST is simplicity. It is often easier to set up and works well for small or medium-sized applications. Developers can quickly create routes, return JSON data, and structure the API using familiar HTTP methods such as GET, POST, PUT, and DELETE. REST also fits naturally with caching, status codes, and standard web patterns.

GraphQL offers more flexibility, particularly in applications with complex relationships between data. For example, if a client needs a user profile, recent posts, and comments in one request, GraphQL can provide all of that through a single query. This can improve efficiency for frontend applications, especially mobile apps or dashboards that need precise and custom data shapes.

However, GraphQL also introduces additional complexity. Developers must define schemas, types, and resolvers. It can be harder to cache and may require stronger validation and security control. For beginners or simple systems, GraphQL may feel like overengineering.

Choosing between REST and GraphQL depends on the goals of the project. REST is often the best choice for straightforward CRUD applications and systems where standard endpoints are enough. GraphQL is more beneficial for data-heavy applications with complex frontend needs.

In conclusion, neither REST nor GraphQL is always better than the other. REST is simpler and easier to adopt, while GraphQL provides more flexibility and control. The best choice depends on the scale, complexity, and requirements of the application being developed.
    `,
    category: "Backend",
    author: "Admin",
    image:
      "frontend/public/assets/api.jpg",
    tags: ["REST API", "GraphQL", "Backend"],
  },
  {
    title: "Cybersecurity Basics Everyone Should Know",
    description:
      "Understand the basic principles of cybersecurity, common online threats, and simple habits that help protect digital information.",
    content: `
In a world where so much personal and professional information is stored online, cybersecurity has become more important than ever. Whether someone is using a smartphone, laptop, email account, or online banking service, they are exposed to digital risks. Learning the basics of cybersecurity helps individuals and organisations stay safer in an increasingly connected environment.

One of the most important cybersecurity habits is creating strong and unique passwords. Weak passwords are easy for attackers to guess, especially when people use the same password for multiple accounts. A secure password should be long, difficult to predict, and different from other passwords. Password managers can be helpful because they generate and store complex passwords securely.

Another essential security practice is enabling two-factor authentication, often called 2FA. This adds an extra verification step when logging in, such as entering a code sent to a phone or email. Even if a password is stolen, 2FA makes it harder for an attacker to access the account.

Phishing is one of the most common online threats. In phishing attacks, scammers send fake emails, messages, or websites designed to trick people into revealing personal details such as passwords, banking information, or verification codes. Users should always check links carefully, verify senders, and avoid downloading attachments from suspicious sources.

Software updates are another important part of cybersecurity. Updates often include security patches that fix known vulnerabilities. Delaying updates can leave devices exposed to threats that attackers already know how to exploit. Keeping operating systems, browsers, and apps updated is a simple but effective defence.

For organisations, cybersecurity also involves broader protection strategies such as firewalls, encryption, access control, and employee training. Human error remains one of the biggest causes of data breaches, which is why awareness and training are just as important as technical tools.

Cybersecurity is not only about avoiding attacks; it is also about building habits that reduce risk over time. Simple actions such as backing up data, using secure Wi-Fi, logging out of public devices, and reviewing account activity can make a big difference.

In conclusion, cybersecurity is a shared responsibility. Everyone who uses digital technology should understand the basics and apply safe online habits. As cyber threats continue to grow, awareness and prevention remain the best first lines of defence.
    `,
    category: "Security",
    author: "Bi",
    image:
      "/images/cybersecurity.jpg",
    tags: ["Cybersecurity", "Security", "Privacy"],
  },
  {
    title: "The Rise of Cloud Computing",
    description:
      "Discover why cloud computing has become essential for modern businesses, remote work, and scalable digital services.",
    content: `
Cloud computing has changed the way individuals and businesses store data, run applications, and manage digital services. Instead of relying only on local computers or physical servers, cloud computing allows users to access computing resources through the internet. This includes storage, databases, software, networking, and processing power provided by platforms such as Amazon Web Services, Microsoft Azure, and Google Cloud.

One of the main reasons cloud computing has become so popular is flexibility. Businesses can increase or reduce their resources depending on current demand. For example, an online shopping website may need more server capacity during a sales event but much less during normal periods. With cloud services, resources can be adjusted quickly without the need to purchase expensive physical infrastructure.

Cost efficiency is another major advantage. Traditional IT systems often require large upfront investments in hardware, maintenance, and staff. Cloud computing reduces these costs by offering pay-as-you-go models. This is particularly useful for startups and small businesses that want to scale gradually without heavy initial expenses.

Cloud computing has also played a significant role in supporting remote work and collaboration. Teams can store documents online, use shared tools, and access systems from different locations. This improves productivity and makes it easier for organisations to operate across cities or countries. Applications such as Google Workspace, Microsoft 365, and cloud-based project tools are now common in everyday business operations.

There are different types of cloud computing services. Infrastructure as a Service (IaaS) provides virtual servers and networking. Platform as a Service (PaaS) gives developers tools to build applications without managing infrastructure. Software as a Service (SaaS) delivers ready-to-use applications through the web. Understanding these models helps businesses choose the right solution for their needs.

Despite its benefits, cloud computing also comes with concerns. Data privacy, security, vendor dependency, and downtime risks must be considered carefully. Organisations need strong access controls, backup strategies, and clear security policies when using cloud environments.

Overall, cloud computing has become a key part of digital transformation. It enables scalability, reduces costs, supports innovation, and makes technology more accessible. As businesses continue moving toward digital operations, cloud computing will remain a powerful foundation for growth and efficiency.
    `,
    category: "Cloud",
    author: "Admin",
    image:
      "/images/cloudcomputing.jpg",
    tags: ["Cloud", "AWS", "Technology"],
  },
  {
    title: "Introduction to Machine Learning",
    description:
      "A beginner-friendly introduction to machine learning, including types of learning, real-world applications, and common challenges.",
    content: `
Machine learning is a branch of artificial intelligence that focuses on building systems capable of learning from data. Instead of being programmed with fixed instructions for every situation, machine learning models identify patterns in data and use those patterns to make predictions or decisions. This ability makes machine learning one of the most influential technologies in the modern digital world.

There are three major categories of machine learning. The first is supervised learning, where the model is trained on labelled data. This means the system learns from examples where the correct answer is already known, such as classifying emails as spam or not spam. The second is unsupervised learning, where the model works with unlabelled data to discover patterns or group similar items, such as customer segmentation. The third is reinforcement learning, where an agent learns through trial and error by receiving rewards or penalties based on its actions.

Machine learning is used in many everyday applications. Streaming services recommend movies based on viewing history. Online stores suggest products based on browsing patterns. Banks use machine learning to detect suspicious transactions. Social media platforms use it to rank content, recognise images, and personalise user feeds. In healthcare, machine learning supports disease prediction and medical image analysis.

One reason machine learning is so powerful is its ability to improve with more data. As systems are exposed to new examples, they can become more accurate and effective. However, this also creates challenges. A model is only as good as the data it is trained on. If the data is biased, incomplete, or poor quality, the results may also be unreliable or unfair.

Another challenge is interpretability. Some machine learning models, especially deep learning systems, can produce accurate predictions but are difficult to explain. In sensitive domains such as healthcare, finance, or recruitment, understanding why a model made a decision is extremely important.

For beginners, learning machine learning usually starts with understanding data, features, labels, training, and evaluation. Common tools include Python, pandas, scikit-learn, and Jupyter Notebook. Building small projects helps learners understand how theory connects with practical use.

In conclusion, machine learning is a powerful field that continues to transform industries and everyday experiences. While it offers huge opportunities for innovation, it also requires careful attention to data quality, fairness, and responsible use.
    `,
    category: "AI",
    author: "Bi",
    image:
      "/images/ml.jpg",
    tags: ["Machine Learning", "AI", "Data Science"],
  },
  {
    title: "UI/UX Design Principles for Beginners",
    description:
      "Learn the most important UI/UX design principles to create digital products that are attractive, usable, and user-focused.",
    content: `
UI and UX design are essential parts of creating successful digital products. UI stands for User Interface, which focuses on the visual elements that people interact with, such as buttons, colours, typography, and layouts. UX stands for User Experience, which focuses on how users feel when using a product and how easily they can complete their goals. Together, UI and UX shape how a website or application looks and works.

One of the most important design principles is simplicity. A simple design reduces confusion and helps users focus on what matters most. Interfaces should avoid unnecessary clutter, overwhelming colour choices, or too many actions on one screen. Users generally prefer layouts that are clean, clear, and easy to understand.

Consistency is another key principle. Buttons, fonts, icons, colours, and navigation patterns should behave similarly across the system. When a design is consistent, users can predict how the interface will work. This reduces frustration and builds confidence. For example, if one primary action button is blue on one page, it should not suddenly become a different style elsewhere without reason.

Accessibility is also a critical part of good design. Digital products should be usable by people with different needs and abilities. This includes providing readable text sizes, strong colour contrast, keyboard support, and clear labels for interactive elements. Accessible design improves usability for everyone, not only users with disabilities.

Visual hierarchy helps guide attention. Designers use size, spacing, contrast, and positioning to show which content is most important. Headings should stand out, important buttons should be easy to notice, and related elements should be grouped together logically. Good hierarchy allows users to scan content quickly and understand what to do next.

User-centred design means creating products based on actual user needs rather than assumptions. Designers often use wireframes, prototypes, interviews, and usability testing to understand what users expect and where they may struggle. Tools such as Figma help designers create and test ideas before development begins.

For beginners, UI/UX design is not only about making things look beautiful. It is about solving problems, improving usability, and creating positive experiences. A visually attractive design may still fail if users cannot navigate it easily or complete tasks efficiently.

In conclusion, strong UI/UX design combines simplicity, consistency, accessibility, and user understanding. These principles help designers create products that are not only beautiful but also effective and enjoyable to use.
    `,
    category: "Design",
    author: "Admin",
    image:
      "/images/uxui.jpg",
    tags: ["UI", "UX", "Design"],
  },
  {
    title: "Why Learn JavaScript in 2025?",
    description:
      "Understand why JavaScript remains one of the most valuable programming languages for web, app, and full-stack development.",
    content: `
JavaScript continues to be one of the most important programming languages in the world, and learning it in 2025 remains a smart decision for beginners and aspiring developers. Originally created to add interactivity to websites, JavaScript has grown into a full ecosystem used for frontend, backend, mobile, and even desktop development.

One of the strongest reasons to learn JavaScript is its role in web development. Nearly every modern website uses JavaScript in some way, whether for animations, dynamic content, forms, or user interaction. Combined with HTML and CSS, JavaScript forms the core foundation of the web. Anyone interested in building websites or web applications will benefit greatly from understanding it.

JavaScript is also valuable because it can be used on both the frontend and backend. On the frontend, libraries and frameworks such as React, Vue, and Angular allow developers to create rich user interfaces. On the backend, Node.js enables JavaScript to run on the server, making it possible to build full-stack applications using a single programming language. This simplifies development and makes JavaScript especially attractive to beginners.

The language also has a large and active community. Because so many developers use JavaScript, there are countless tutorials, libraries, tools, and open-source projects available. This support makes learning easier and gives developers access to resources when solving problems or building new features.

JavaScript is not limited to websites. Developers can use React Native for mobile app development and Electron for desktop applications. This means that one language can open pathways into multiple types of software development. For students and career changers, this versatility is a huge advantage.

Of course, JavaScript also comes with challenges. Beginners may find topics such as asynchronous code, promises, closures, and state management difficult at first. However, these concepts become easier with practice and are valuable in many programming contexts.

In conclusion, JavaScript remains highly relevant in 2025 because it powers modern web experiences and supports full-stack development. It is flexible, widely used, and supported by a massive ecosystem. Learning JavaScript provides a strong foundation for building real projects and entering the tech industry with confidence.
    `,
    category: "Programming",
    author: "Bi",
    image:
      "/images/javascript.jpg",
    tags: ["JavaScript", "Programming", "Web Development"],
  },
];

const seedPosts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    for (const post of blogPosts) {
      const existingPost = await Post.findOne({ title: post.title });

      if (!existingPost) {
        await Post.create(post);
        console.log(`Inserted: ${post.title}`);
      } else {
        console.log(`Skipped (already exists): ${post.title}`);
      }
    }

    console.log("Seeding completed");
    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedPosts();