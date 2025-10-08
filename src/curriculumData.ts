// curriculumData.ts

export const coursesData = [
  {
    courseCode: "CS101-DSA",
    name: "Data Structures and Algorithms",
    chapters: [
      {
        title: "Chapter 1: Introduction to Data Structures",
        topics: [
          "Data types and Control Structures",
          "Definition of Data Structures and algorithm",
          "Abstract Data Type (ADT)",
          "Algorithm Efficiency - Time and Space complexity",
          "Mathematical notations - Big O, Omega and Theta",
          "Linear and Binary search algorithms"
        ],
        importantTopics: ["Abstract Data Type (ADT)", "Mathematical notations - Big O, Omega and Theta"],
        pdfs: [
          { name: "DSA Unit 1 Notes - SRMIST", url: "https://www.scribd.com/document/582885968/18CSC162J-DSA-Unit1" },
          { name: "Data Structures Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/DATA%20STRUCTURES(1).pdf" }
        ],
        videos: [
          { title: "Introduction to Data Structures & Algorithms", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" },
          { title: "Data Structures and Algorithms Full Course", url: "https://www.youtube.com/watch?v=CBYHwZcbD-s" }
        ]
      },
      {
        title: "Chapter 2: List Structures",
        topics: [
          "Operations on List ADT - Create, Insert, Search, Delete, Display",
          "Implementation of List ADT - Array, Cursor based and Linked",
          "Types - Singly, Doubly, Circular linked lists",
          "Applications - Sparse Matrix, Polynomial Arithmetic, Joseph Problem"
        ],
        importantTopics: ["Operations on List ADT", "Types - Singly, Doubly, Circular linked lists"],
        pdfs: [
          { name: "Linked Lists Implementation Notes", url: "https://mrcet.com/downloads/digital_notes/CSE/II%20Year/DATA%20STRUCTURES%20DIGITAL%20NOTES.pdf" }
        ],
        videos: [
          { title: "Linked Lists Tutorial", url: "https://www.youtube.com/playlist?list=PLBZBJbE_rGRV8D7XZ08LK6z-4zPoWzu5H" }
        ]
      },
      {
        title: "Chapter 3: Stack and Queue",
        topics: [
          "Operations on Stack ADT - Create, Push, Pop, Top",
          "Implementation of Stack ADT - Array and Linked",
          "Applications - Infix to Postfix Conversion, Postfix Evaluation, Balancing symbols, Function Calls, Tower of Hanoi",
          "Operations on Queue ADT - Create, Enqueue and Dequeue",
          "Implementation of Queue ADT - Array and Linked",
          "Types of Queue - Circular, Double ended and Priority Queue",
          "Applications - Scheduling"
        ],
        importantTopics: ["Stack ADT Operations", "Queue types and applications"],
        pdfs: [
          { name: "Stack and Queue Implementation", url: "https://mrcet.com/downloads/digital_notes/CSE/II%20Year/DATA%20STRUCTURES%20DIGITAL%20NOTES.pdf" }
        ],
        videos: [
          { title: "Stack and Queue Data Structures", url: "https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU" }
        ]
      },
      {
        title: "Chapter 4: Trees and Hashing",
        topics: [
          "Introduction to Trees, Tree traversals",
          "Complete Binary Tree and its height",
          "Binary Search Trees, Need for Balance, Rotation",
          "AVL trees, B Trees, Heaps",
          "Trees and array implementations and applications",
          "Hash functions - Introduction, functions, Collision avoidance",
          "Separate chaining, Open Addressing, Linear Probing, Quadratic probing"
        ],
        importantTopics: ["Binary Search Trees", "Hash functions and collision handling"],
        pdfs: [
          { name: "Trees and Hashing Notes", url: "https://mrcet.com/downloads/digital_notes/CSE/II%20Year/DATA%20STRUCTURES%20DIGITAL%20NOTES.pdf" }
        ],
        videos: [
          { title: "Tree Data Structures Complete Tutorial", url: "https://www.youtube.com/watch?v=8hly31xKli0" }
        ]
      },
      {
        title: "Chapter 5: Graph",
        topics: [
          "Introduction to Graph, Graph Traversal",
          "Topological sorting",
          "Minimum spanning tree - Prims Algorithm, Kruskal's Algorithm",
          "Shortest Path Algorithm - Dijkstra's Algorithm"
        ],
        importantTopics: ["Graph Traversal algorithms", "Minimum spanning tree algorithms"],
        pdfs: [
          { name: "Graph Algorithms Notes", url: "https://mrcet.com/downloads/digital_notes/CSE/II%20Year/DATA%20STRUCTURES%20DIGITAL%20NOTES.pdf" }
        ],
        videos: [
          { title: "Graph Data Structure Tutorial", url: "https://www.youtube.com/watch?v=8hly31xKli0" }
        ]
      }
    ]
  },
  {
    courseCode: "CS102-OS",
    name: "Operating Systems",
    chapters: [
      {
        title: "Chapter 1: Introduction",
        topics: [
          "Computer system overview - basic elements",
          "Instruction execution, Interrupts",
          "Memory hierarchy, I/O communication techniques",
          "Operating system overview - objectives and functions",
          "Evolution of OS Microsoft windows overview"
        ],
        importantTopics: ["Computer system overview", "Operating system objectives and functions"],
        pdfs: [
          { name: "Operating Systems Course Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/C_Sc%20coureware%20OS_e-Notes.pdf" },
          { name: "OS Introduction Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cs0206_os.pdf" }
        ],
        videos: [
          { title: "Introduction to Operating Systems", url: "https://www.youtube.com/watch?v=dOiA2nNJpc0" },
          { title: "Complete Operating Systems Course", url: "https://www.youtube.com/watch?v=3obEP8eLsCw" }
        ]
      },
      {
        title: "Chapter 2: Processes",
        topics: [
          "Process description and control - process states",
          "Process description, process control",
          "Processes and Threads",
          "Symmetric Multiprocessing and microkernels",
          "Windows Thread and SMP management",
          "Case studies - UNIX, SOLARIS thread management"
        ],
        importantTopics: ["Process states and control", "Processes vs Threads"],
        pdfs: [
          { name: "Process Management Notes", url: "https://srmvalliammai.ac.in/wp-content/uploads/2022/05/1904304-operating-systems.pdf" }
        ],
        videos: [
          { title: "OS Process Management", url: "https://www.cse.iitb.ac.in/~mythili/os/" },
          { title: "Operating Systems for Beginners", url: "https://www.youtube.com/watch?v=yK1uBHPdp30" }
        ]
      },
      {
        title: "Chapter 3: Concurrency and Scheduling",
        topics: [
          "Principles of concurrency - mutual exclusion",
          "Semaphores, monitors, Readers/Writers problem",
          "Deadlocks - prevention, avoidance, detection",
          "Scheduling - Types of scheduling, scheduling algorithms",
          "Case studies - UNIX scheduling"
        ],
        importantTopics: ["Deadlock handling", "CPU scheduling algorithms"],
        pdfs: [
          { name: "Concurrency and Scheduling", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/C_Sc%20coureware%20OS_e-Notes.pdf" }
        ],
        videos: [
          { title: "Process Synchronization Tutorial", url: "https://www.youtube.com/watch?v=yK1uBHPdp30" }
        ]
      },
      {
        title: "Chapter 4: Memory Management",
        topics: [
          "Memory management requirements",
          "Partitioning, paging, and segmentation",
          "Virtual memory - Hardware and control structures",
          "Operating system software",
          "Linux memory management",
          "Case studies - WINDOWS memory management, UNIX and SOLARIS Memory management"
        ],
        importantTopics: ["Virtual memory concepts", "Paging and segmentation"],
        pdfs: [
          { name: "Memory Management Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/C_Sc%20coureware%20OS_e-Notes.pdf" }
        ],
        videos: [
          { title: "Memory Management in OS", url: "https://www.youtube.com/watch?v=yK1uBHPdp30" }
        ]
      },
      {
        title: "Chapter 5: Input/Output and File Systems",
        topics: [
          "I/O management and disk scheduling - I/O devices",
          "Organization of I/O functions, OS design issues",
          "I/O buffering, disk scheduling, Disk cache",
          "File management - organization, directories, file sharing",
          "Record blocking, secondary storage management",
          "Case studies - LINUX I/O, UNIX File management"
        ],
        importantTopics: ["Disk scheduling algorithms", "File system organization"],
        pdfs: [
          { name: "File Systems Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/C_Sc%20coureware%20OS_e-Notes.pdf" }
        ],
        videos: [
          { title: "File Systems and I/O Management", url: "https://www.youtube.com/watch?v=yK1uBHPdp30" }
        ]
      }
    ]
  },
  {
    courseCode: "CS103-DBMS",
    name: "Database Management Systems",
    chapters: [
      {
        title: "Chapter 1: Introduction",
        topics: [
          "Issues in File Processing System, Need for DBMS",
          "Basic terminologies of Database",
          "Database system Architecture",
          "Various Data models",
          "ER diagram basics and extensions",
          "Construction of Database design using Entity Relationship diagram",
          "Case studies - University Database, Banking System, Information System"
        ],
        importantTopics: ["Database system Architecture", "ER diagram construction"],
        pdfs: [
          { name: "DBMS Introduction Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/CS0304-DatabaseManagementSystem.pdf" },
          { name: "Database Systems Course Material", url: "https://srmvalliammai.ac.in/wp-content/uploads/2025/02/cs3463-database-management-systems.pdf" }
        ],
        videos: [
          { title: "Database Management Systems Tutorial", url: "https://www.youtube.com/playlist?list=PLrjkTql3jnm-CLxHftqLgkrZbM8fUt0vn" },
          { title: "DBMS Complete Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y" }
        ]
      },
      {
        title: "Chapter 2: Relational DBMS",
        topics: [
          "Conversion of ER model to Relational Table",
          "Discussion of various design issues",
          "Pitfalls in Relational Database systems",
          "Various Relational languages - Tuple Relational calculus, Domain relational calculus",
          "Calculus Vs Algebra, Computational capabilities",
          "Applying Relational Algebra for queries"
        ],
        importantTopics: ["ER to Relational mapping", "Relational Algebra operations"],
        pdfs: [
          { name: "Relational Model Notes", url: "https://srmvalliammai.ac.in/wp-content/uploads/2025/02/cs3463-database-management-systems.pdf" }
        ],
        videos: [
          { title: "Relational Database Design", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y" }
        ]
      },
      {
        title: "Chapter 3: SQL",
        topics: [
          "SQL commands, Constraints, Joins",
          "Set operations, Sub queries, Views",
          "PL-SQL, Triggers, and Cursors",
          "Implement queries using SQL, PL-SQL, Cursor and Triggers"
        ],
        importantTopics: ["SQL Joins and subqueries", "PL-SQL programming"],
        pdfs: [
          { name: "SQL Programming Guide", url: "https://srmvalliammai.ac.in/wp-content/uploads/2025/02/cs3463-database-management-systems.pdf" }
        ],
        videos: [
          { title: "Complete SQL Tutorial", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y" }
        ]
      },
      {
        title: "Chapter 4: Normalization",
        topics: [
          "Normalization, Need for Normalization",
          "First Normal Form (1NF), Second Normal Form (2NF)",
          "Third Normal Form (3NF), Fourth Normal Form (4NF)",
          "Fifth Normal Form (5NF)",
          "Apply Conversion rules and normalize the Database"
        ],
        importantTopics: ["Normal forms (1NF to 5NF)", "Database normalization process"],
        pdfs: [
          { name: "Database Normalization Notes", url: "https://srmvalliammai.ac.in/wp-content/uploads/2022/05/1904401-database-management-system.pdf" }
        ],
        videos: [
          { title: "Database Normalization Tutorial", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y" }
        ]
      },
      {
        title: "Chapter 5: Concurrency Control",
        topics: [
          "Storage Structure, Transaction control",
          "Concurrency control algorithms",
          "Issues in Concurrent execution",
          "Failures and Recovery algorithms",
          "NoSQL Databases - Document Oriented, Key value pairs",
          "Column Oriented and Graph databases"
        ],
        importantTopics: ["Transaction control", "Concurrency control mechanisms"],
        pdfs: [
          { name: "Transaction Management Notes", url: "https://srmvalliammai.ac.in/wp-content/uploads/2022/05/1904401-database-management-system.pdf" }
        ],
        videos: [
          { title: "Database Transactions and Concurrency", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y" }
        ]
      }
    ]
  },
  {
    courseCode: "CS104-CN",
    name: "Computer Networks",
    chapters: [
      {
        title: "Chapter 1: Introduction to Computer Networks",
        topics: [
          "History and Need for Networking",
          "Service Description - Connectionless and Connection Oriented Services",
          "Circuit and Packet Switching",
          "Access Networks and Physical Media",
          "Wireless Links and Characteristics",
          "OSI Reference Model - Service Models",
          "Ad-hoc network, GPS, Sensor network"
        ],
        importantTopics: ["OSI Reference Model", "Circuit vs Packet Switching"],
        pdfs: [
          { name: "Computer Networks Introduction", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cn.pdf" },
          { name: "Networking Fundamentals", url: "http://srmnotes.weebly.com/15it303j-computer-networks.html" }
        ],
        videos: [
          { title: "Computer Networking Full Course", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8" },
          { title: "Networking for Beginners", url: "https://www.youtube.com/watch?v=fErDcUtd8fA" }
        ]
      },
      {
        title: "Chapter 2: Application Layer",
        topics: [
          "Principles of Network Applications",
          "The Web and HTTP - FTP",
          "Electronic Mail - SMTP",
          "Mail Message Formats and MIME - DNS",
          "Socket Programming with TCP and UDP",
          "Multimedia Networking - Internet Telephony",
          "RTP - RTCP - RTSP",
          "Network Security - Principles of Cryptography",
          "Firewalls - Application Gateway",
          "Attacks and Counter measures"
        ],
        importantTopics: ["HTTP protocol", "Socket Programming"],
        pdfs: [
          { name: "Application Layer Protocols", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cn.pdf" }
        ],
        videos: [
          { title: "Application Layer in Computer Networks", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx" }
        ]
      },
      {
        title: "Chapter 3: Transport Layer",
        topics: [
          "Transport Layer Services",
          "Multiplexing and Demultiplexing - UDP",
          "Reliable Data Transfer - Go-Back-N and Selective Repeat",
          "Connection-Oriented Transport - TCP",
          "Segment Structure - RTT estimation",
          "Flow Control - Connection Management",
          "Congestion Control - TCP Delay Modeling",
          "SSL and TLS",
          "Integrated and Differentiated Services - Intserv - Diffserv"
        ],
        importantTopics: ["TCP vs UDP", "Congestion Control mechanisms"],
        pdfs: [
          { name: "Transport Layer Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cn.pdf" }
        ],
        videos: [
          { title: "Transport Layer Tutorial", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" }
        ]
      },
      {
        title: "Chapter 4: Network Layer",
        topics: [
          "Forwarding and Routing",
          "Network Service Models",
          "Virtual Circuit and Datagram Networks - Router",
          "Internet Protocol (IP) - IPv4 and IPv6",
          "ICMP",
          "Link State Routing - Distance Vector Routing",
          "Mobile IP"
        ],
        importantTopics: ["IP addressing", "Routing algorithms"],
        pdfs: [
          { name: "Network Layer Concepts", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cn.pdf" }
        ],
        videos: [
          { title: "Network Layer in Computer Networks", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" }
        ]
      },
      {
        title: "Chapter 5: Data Link Layer",
        topics: [
          "Layer Services",
          "Error Detection and Correction Techniques",
          "Multiple Access Protocols",
          "Link Layer Addressing - ARP - DHCP",
          "Ethernet - Hubs, Bridges, and Switches",
          "PPP",
          "Ring Topology - Physical Ring - Logical Ring"
        ],
        importantTopics: ["Error Detection techniques", "Ethernet protocol"],
        pdfs: [
          { name: "Data Link Layer Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cn.pdf" }
        ],
        videos: [
          { title: "Data Link Layer Tutorial", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" }
        ]
      }
    ]
  },
  {
    courseCode: "CS105-DAA",
    name: "Design and Analysis of Algorithms",
    chapters: [
      {
        title: "Chapter 1: Analysis of Algorithms",
        topics: [
          "Introduction to Algorithms",
          "Pseudo code for algorithms",
          "Mathematics for Algorithms - Definitions",
          "Notation and Basic results",
          "Asymptotic Notation - Big O, Omega, Theta",
          "Mathematical Induction",
          "Analysis of Algorithms",
          "Recurrence relations and their solutions"
        ],
        importantTopics: ["Asymptotic Notation", "Time complexity analysis"],
        pdfs: [
          { name: "Algorithm Analysis Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/files/cs0203_design_and_analysis_of_algorithms_new.pdf" },
          { name: "DAA Course Material", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/CS0203-DAA(1).pdf" }
        ],
        videos: [
          { title: "Introduction to Algorithms", url: "https://www.youtube.com/watch?v=JeKig3OLsM8" },
          { title: "Design and Analysis of Algorithms", url: "https://www.youtube.com/watch?v=NqKkxQamroo" }
        ]
      },
      {
        title: "Chapter 2: Divide and Conquer Method",
        topics: [
          "General Method",
          "Binary Search",
          "Finding Maximum and Minimum",
          "Merge Sort",
          "Quick Sort",
          "Greedy Method - General Method",
          "Knapsack Problem",
          "Minimum Spanning Tree Algorithm",
          "Single Source Shortest Path Algorithm"
        ],
        importantTopics: ["Merge Sort algorithm", "Quick Sort implementation"],
        pdfs: [
          { name: "Divide and Conquer Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/files/cs0203_design_and_analysis_of_algorithms_new.pdf" }
        ],
        videos: [
          { title: "Divide and Conquer Algorithms", url: "https://www.youtube.com/watch?v=EolP-WNP-Zc" },
          { title: "Complete DAA Course", url: "https://www.youtube.com/watch?v=z6DY_YSdyww" }
        ]
      },
      {
        title: "Chapter 3: Dynamic Programming",
        topics: [
          "General Method",
          "Multistage Graph",
          "All Pairs Shortest Path Algorithm",
          "0/1 Knapsack Problem",
          "Traveling Salesman Problem",
          "Basic search techniques and traversal techniques",
          "Bi-connected components",
          "Depth First Search",
          "Breadth First Search"
        ],
        importantTopics: ["Dynamic programming approach", "0/1 Knapsack Problem"],
        pdfs: [
          { name: "Dynamic Programming Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/files/cs0203_design_and_analysis_of_algorithms_new.pdf" }
        ],
        videos: [
          { title: "Dynamic Programming Tutorial", url: "https://www.youtube.com/playlist?list=PL1QH9gyQXfgs7foRxIbIH8wmJyDh5QzAm" }
        ]
      },
      {
        title: "Chapter 4: Backtracking",
        topics: [
          "The General Method",
          "8-Queens Problem",
          "Sum of Subsets",
          "Graph Coloring",
          "Hamiltonian Cycle",
          "Knapsack Problem",
          "Branch and Bound Method",
          "0/1 Knapsack Problem",
          "Traveling Salesman Problem"
        ],
        importantTopics: ["Backtracking technique", "N-Queens Problem"],
        pdfs: [
          { name: "Backtracking Algorithms", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/files/cs0203_design_and_analysis_of_algorithms_new.pdf" }
        ],
        videos: [
          { title: "Backtracking Algorithms", url: "https://www.youtube.com/playlist?list=PL1QH9gyQXfgs7foRxIbIH8wmJyDh5QzAm" }
        ]
      },
      {
        title: "Chapter 5: P and NP Problems",
        topics: [
          "Polynomial time",
          "Nondeterministic Algorithms and NP",
          "Reducibility and NP completeness",
          "NP complete Problems",
          "More on NP completeness",
          "NP Hard Graph Problems",
          "NP Hard Scheduling Problems",
          "Flow Shop & Job Scheduling",
          "NP Hard Code Generation Problems",
          "Case studies"
        ],
        importantTopics: ["P vs NP problem", "NP-completeness theory"],
        pdfs: [
          { name: "Complexity Theory Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/files/cs0203_design_and_analysis_of_algorithms_new.pdf" }
        ],
        videos: [
          { title: "P vs NP Problems", url: "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/video_galleries/lecture-videos/" }
        ]
      }
    ]
  },
  {
    courseCode: "CS106-AI",
    name: "Artificial Intelligence",
    chapters: [
      {
        title: "Chapter 1: Introduction to AI",
        topics: [
          "Introduction, Definition, Future of Artificial Intelligence",
          "Characteristics, Typical Intelligent agents",
          "Problem solving approach, Problem Solving methods",
          "Search strategies, Uniformed and informed",
          "Heuristics, Local search",
          "Algorithm and optimization problems",
          "Searching with partial observations",
          "Constraint satisfactory problems"
        ],
        importantTopics: ["Intelligent agents", "Search strategies"],
        pdfs: [
          { name: "AI Introduction Notes", url: "https://webstor.srmist.edu.in/web_assets/downloads/2025/artificial-intelligence-syllabus.pdf" },
          { name: "AI Course Material", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cs0302_ai_es.pdf" }
        ],
        videos: [
          { title: "Introduction to Artificial Intelligence", url: "https://www.youtube.com/playlist?list=PLTjTBmfVU0_ktp4_dzAh2HS_n1-aRrCrM" },
          { title: "AI Complete Course", url: "https://www.youtube.com/playlist?list=PL9ooVrP1hQjwqPfZ6DKwWHMGbzjhR_H-P" }
        ]
      },
      {
        title: "Chapter 2: Search Techniques",
        topics: [
          "Uniformed search Methods - Breadth first search",
          "Depth first search, Depth limited search",
          "Iterative Deepening search, Bi-directional search",
          "Informed search - Generate and test, Best First search",
          "A* Algorithm, AO* search",
          "Local search Algorithms - Hill Climbing, Simulated Annealing",
          "Local Beam Search, Genetic Algorithms"
        ],
        importantTopics: ["A* Algorithm", "Search optimization techniques"],
        pdfs: [
          { name: "Search Algorithms Notes", url: "https://webstor.srmist.edu.in/web_assets/downloads/2025/artificial-intelligence-syllabus.pdf" }
        ],
        videos: [
          { title: "AI Search Algorithms", url: "https://www.youtube.com/playlist?list=PLTjTBmfVU0_ktp4_dzAh2HS_n1-aRrCrM" }
        ]
      },
      {
        title: "Chapter 3: Knowledge Representation",
        topics: [
          "First order predicate logic, Prolog programming",
          "Unification, Forward Chaining, Backward chaining",
          "Resolution, Knowledge Representation, Ontological Engineering",
          "Categories, Objects, Events, Mental Events, Mental Objects",
          "Knowledge representation using rules",
          "Knowledge representation using semantic nets",
          "Knowledge representation using frames"
        ],
        importantTopics: ["First order logic", "Knowledge representation methods"],
        pdfs: [
          { name: "Knowledge Representation Notes", url: "https://webstor.srmist.edu.in/web_assets/downloads/2025/artificial-intelligence-syllabus.pdf" }
        ],
        videos: [
          { title: "Knowledge Representation in AI", url: "https://www.youtube.com/playlist?list=PLTjTBmfVU0_ktp4_dzAh2HS_n1-aRrCrM" }
        ]
      },
      {
        title: "Chapter 4: Machine Learning and Neural Networks",
        topics: [
          "Introduction to machine learning, Goals and Challenges",
          "Learning concepts, models",
          "Artificial neural network based learning - Back propagation",
          "Support vector machines",
          "Reinforcement learning, Adaptive learning",
          "Multi agent based learning",
          "Decision tree learning, Instance based learning"
        ],
        importantTopics: ["Neural networks", "Machine learning algorithms"],
        pdfs: [
          { name: "ML in AI Notes", url: "https://webstor.srmist.edu.in/web_assets/downloads/2025/artificial-intelligence-syllabus.pdf" }
        ],
        videos: [
          { title: "Machine Learning for AI", url: "https://www.youtube.com/playlist?list=PLTjTBmfVU0_ktp4_dzAh2HS_n1-aRrCrM" }
        ]
      },
      {
        title: "Chapter 5: Advanced AI Topics",
        topics: [
          "Natural language processing - Levels of NLP",
          "Syntactic and Semantic Analysis",
          "Information retrieval, Information Extraction",
          "Machine translation, NLP Applications",
          "Expert system - Architecture",
          "Rule based systems, Frame based expert system",
          "Cloud Computing and intelligent agent",
          "Business intelligence and analytics"
        ],
        importantTopics: ["Natural Language Processing", "Expert systems"],
        pdfs: [
          { name: "Advanced AI Topics", url: "https://webstor.srmist.edu.in/web_assets/downloads/2025/artificial-intelligence-syllabus.pdf" }
        ],
        videos: [
          { title: "NLP and Expert Systems", url: "https://www.youtube.com/playlist?list=PLTjTBmfVU0_ktp4_dzAh2HS_n1-aRrCrM" }
        ]
      }
    ]
  },
  {
    courseCode: "CS107-ML",
    name: "Machine Learning",
    chapters: [
      {
        title: "Chapter 1: Introduction and Types of Learning",
        topics: [
          "What is Machine Learning, types of learning",
          "Supervised, Unsupervised, Semi-Supervised learning",
          "Linear Regression, applications, bias-variance",
          "Logistic Regression introduction",
          "Cross-validation basics, overfitting vs underfitting",
          "Curse of Dimensionality",
          "Linear Algebra for ML"
        ],
        importantTopics: ["Types of machine learning", "Linear and Logistic Regression"],
        pdfs: [
          { name: "ML Introduction Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2018/b.tech-15CS324E-Machinelearning.pdf" },
          { name: "Machine Learning Course Material", url: "https://srmap.edu.in/wp-content/uploads/2021/12/2021-2023-M_Tech-Syllabus.pdf" }
        ],
        videos: [
          { title: "Machine Learning Full Course", url: "https://www.youtube.com/watch?v=ukzFI9rgwfU" },
          { title: "ML Introduction", url: "https://www.youtube.com/playlist?list=PLeo1K3hjS3uvCeTYTeyfe0-rN5r8zn9rw" }
        ]
      },
      {
        title: "Chapter 2: Design and Analysis of ML Algorithms",
        topics: [
          "Cross-validation, bootstrapping, resampling",
          "Performance metrics - accuracy, confusion matrix",
          "Precision, recall, F1-score, ROC curve",
          "Logistic Regression detailed implementation",
          "T-test and ANOVA",
          "McNemar's Test",
          "Performance Metrics analysis"
        ],
        importantTopics: ["Performance metrics", "Cross-validation techniques"],
        pdfs: [
          { name: "ML Algorithm Analysis", url: "https://srmap.edu.in/wp-content/uploads/2021/12/2021-2023-M_Tech-Syllabus.pdf" }
        ],
        videos: [
          { title: "ML Performance Evaluation", url: "https://www.youtube.com/playlist?list=PLeo1K3hjS3uvCeTYTeyfe0-rN5r8zn9rw" }
        ]
      },
      {
        title: "Chapter 3: Distance-Based Models",
        topics: [
          "K-Nearest Neighbors Algorithm",
          "Principal Component Analysis (PCA) - dimensionality reduction",
          "Naive Bayes classifier",
          "Support Vector Machines - linear and kernels",
          "Ridge and Lasso Regression",
          "Maximum Likelihood Estimation",
          "Gradient Boosted Trees"
        ],
        importantTopics: ["KNN Algorithm", "Support Vector Machines"],
        pdfs: [
          { name: "Distance-Based ML Models", url: "https://srmap.edu.in/wp-content/uploads/2021/12/2021-2023-M_Tech-Syllabus.pdf" }
        ],
        videos: [
          { title: "SVM and KNN Tutorial", url: "https://www.youtube.com/playlist?list=PLeo1K3hjS3uvCeTYTeyfe0-rN5r8zn9rw" }
        ]
      },
      {
        title: "Chapter 4: Clustering Techniques",
        topics: [
          "K-Means clustering applications",
          "Image segmentation, text clustering",
          "Hierarchical Clustering",
          "Spectral Clustering",
          "Agglomerative Clustering",
          "Clustering Evaluation Metrics",
          "DBSCAN clustering algorithm"
        ],
        importantTopics: ["K-Means clustering", "Hierarchical clustering methods"],
        pdfs: [
          { name: "Clustering Algorithms Notes", url: "https://srmap.edu.in/wp-content/uploads/2021/12/2021-2023-M_Tech-Syllabus.pdf" }
        ],
        videos: [
          { title: "Clustering Algorithms Tutorial", url: "https://www.youtube.com/playlist?list=PLeo1K3hjS3uvCeTYTeyfe0-rN5r8zn9rw" }
        ]
      },
      {
        title: "Chapter 5: Tree-Based Models and Neural Networks",
        topics: [
          "Decision Trees - Gini and Entropy",
          "Random Forests algorithm",
          "Ensemble methods - Bagging and Boosting",
          "Neural Networks - Perceptron",
          "Multi-layer networks and backpropagation",
          "Deep learning introduction",
          "Gradient descent optimization"
        ],
        importantTopics: ["Decision Trees", "Neural Networks fundamentals"],
        pdfs: [
          { name: "Tree Models and Neural Networks", url: "https://srmap.edu.in/wp-content/uploads/2021/12/2021-2023-M_Tech-Syllabus.pdf" }
        ],
        videos: [
          { title: "Decision Trees and Random Forest", url: "https://www.youtube.com/playlist?list=PLeo1K3hjS3uvCeTYTeyfe0-rN5r8zn9rw" }
        ]
      }
    ]
  },
  {
    courseCode: "CS108-CG",
    name: "Computer Graphics and Animation",
    chapters: [
      {
        title: "Chapter 1: Introduction to Computer Graphics",
        topics: [
          "Introduction to computer graphics and applications",
          "Graphics System Overview",
          "Raster and Random scan systems",
          "Input, Output Devices",
          "Line drawing Algorithm - DDA",
          "Bresenham Algorithms (Line)",
          "Midpoint Circle Algorithm",
          "Midpoint Ellipse Algorithm"
        ],
        importantTopics: ["Graphics systems", "Line drawing algorithms"],
        pdfs: [
          { name: "Computer Graphics Introduction", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/files/IT%200475_%20Computer%20Graphics.pdf" },
          { name: "CG Course Material", url: "https://srmvalliammai.ac.in/wp-content/uploads/2022/05/1908010-computer-graphics-and-multimedia.pdf" }
        ],
        videos: [
          { title: "Computer Graphics Full Course", url: "https://www.youtube.com/playlist?list=PLV8vIYTIdSnar4uzz-4TIlgyFJ2m18NE3" },
          { title: "Graphics Programming Tutorial", url: "https://www.youtube.com/playlist?list=PLjEaoINr3zgEPv5y--4MKpciLaoQYZB1Z" }
        ]
      },
      {
        title: "Chapter 2: 2D Transformations and Viewing",
        topics: [
          "Geometric Transformations - Matrix representation",
          "Homogeneous and Composite transformations",
          "2D Viewing - pipeline and coordinate reference",
          "Window to viewport transformation",
          "2D Viewing functions",
          "Clipping - Point, Line clipping",
          "Polygon Clipping algorithms"
        ],
        importantTopics: ["2D transformations", "Clipping algorithms"],
        pdfs: [
          { name: "2D Transformations Notes", url: "https://srmvalliammai.ac.in/wp-content/uploads/2022/05/1908010-computer-graphics-and-multimedia.pdf" }
        ],
        videos: [
          { title: "2D Transformations Tutorial", url: "https://www.youtube.com/playlist?list=PLV8vIYTIdSnar4uzz-4TIlgyFJ2m18NE3" }
        ]
      },
      {
        title: "Chapter 3: 3D Graphics and Transformations",
        topics: [
          "3D Concepts and Object representation",
          "Polygon surfaces and tables",
          "Plane equations and meshes",
          "Curved lines and surfaces",
          "Quadratic surfaces and Blobby objects",
          "Spline representation",
          "Bezier and B-Spline Curves and surfaces"
        ],
        importantTopics: ["3D object representation", "Spline curves"],
        pdfs: [
          { name: "3D Graphics Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/files/IT%200475_%20Computer%20Graphics.pdf" }
        ],
        videos: [
          { title: "3D Graphics Programming", url: "https://www.youtube.com/playlist?list=PLV8vIYTIdSnar4uzz-4TIlgyFJ2m18NE3" }
        ]
      },
      {
        title: "Chapter 4: 3D Viewing and Visible Surface Detection",
        topics: [
          "3D geometric and modeling transforms",
          "3D Viewing - Viewing Pipeline",
          "Viewing Coordinates and Projections",
          "3D Clipping algorithms",
          "Visible Surface Detection methods",
          "Back-face detection, Z-buffer algorithm",
          "Depth sorting method"
        ],
        importantTopics: ["3D viewing pipeline", "Visible surface detection"],
        pdfs: [
          { name: "3D Viewing and Visibility", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/files/IT%200475_%20Computer%20Graphics.pdf" }
        ],
        videos: [
          { title: "3D Viewing and Projections", url: "https://www.youtube.com/playlist?list=PLV8vIYTIdSnar4uzz-4TIlgyFJ2m18NE3" }
        ]
      },
      {
        title: "Chapter 5: Illumination and Color Models",
        topics: [
          "Basic models of illumination",
          "Halftone and dithering techniques",
          "Properties of Light",
          "RGB Color Model, YIQ and CMY color model",
          "HSV and HLS color model",
          "Color selection and conversion",
          "Shading techniques - Flat, Gouraud, Phong shading"
        ],
        importantTopics: ["Color models", "Illumination and shading"],
        pdfs: [
          { name: "Color Models and Illumination", url: "https://srmvalliammai.ac.in/wp-content/uploads/2022/05/1908010-computer-graphics-and-multimedia.pdf" }
        ],
        videos: [
          { title: "Color Models and Lighting", url: "https://www.youtube.com/playlist?list=PLV8vIYTIdSnar4uzz-4TIlgyFJ2m18NE3" }
        ]
      }
    ]
  },
  {
    courseCode: "CS109-CD",
    name: "Compiler Design",
    chapters: [
      {
        title: "Chapter 1: Introduction to Compilers",
        topics: [
          "Compilers - Analysis of the source program",
          "Phases of a compiler - Cousins of the Compiler",
          "Grouping of Phases - Compiler construction tools",
          "Lexical Analysis - Role of Lexical Analyzer",
          "Input Buffering - Specification of Tokens",
          "LEX - Finite Automata",
          "Regular Expressions to Automata - Minimizing DFA"
        ],
        importantTopics: ["Compiler phases", "Lexical analysis"],
        pdfs: [
          { name: "Compiler Design Introduction", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/CS0301-Compiler%20Design(1).pdf" },
          { name: "Compiler Construction Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cs0352_princi_compiler_se.pdf" }
        ],
        videos: [
          { title: "Compiler Design Complete Course", url: "https://www.youtube.com/playlist?list=PLEbnTDxVgJOOYdXkOFgT8l3sMO1rU2a3p" },
          { title: "Introduction to Compilers", url: "https://www.youtube.com/playlist?list=PLV8vIYTIdSnarFvpl_yj5qz_hTNgYYEol" }
        ]
      },
      {
        title: "Chapter 2: Top-Down Parsing",
        topics: [
          "Role of Parser - Grammars - Error Handling",
          "Context-Free Grammars - Writing a grammar",
          "Elimination of Ambiguity - Left Recursion - Left Factoring",
          "Top Down Parsing - Recursive Descent Parser",
          "Predictive Parser - LL(1) Parser",
          "Computation of FIRST - Computation of FOLLOW",
          "Construction of predictive parsing table"
        ],
        importantTopics: ["Context-free grammars", "LL(1) parsing"],
        pdfs: [
          { name: "Parsing Techniques", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/CS0301-Compiler%20Design(1).pdf" }
        ],
        videos: [
          { title: "Parsing Techniques Tutorial", url: "https://www.youtube.com/playlist?list=PLEbnTDxVgJOOYdXkOFgT8l3sMO1rU2a3p" }
        ]
      },
      {
        title: "Chapter 3: Bottom-Up Parsing",
        topics: [
          "Bottom Up Parsing - Reductions - Handle Pruning",
          "Shift Reduce Parser - Problems related to Shift Reduce Parsing",
          "Operator Precedence Parser, LEADING, TRAILING",
          "LR Parser - LR Parsers - Need of LR Parsers",
          "LR(0) Item - Closure of Item Sets",
          "Construction of SLR Parsing Table",
          "Construction of Canonical LR(1) - LALR Parser"
        ],
        importantTopics: ["LR parsing", "Shift-reduce parsing"],
        pdfs: [
          { name: "Bottom-Up Parsing Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/CS0301-Compiler%20Design(1).pdf" }
        ],
        videos: [
          { title: "LR Parsing Tutorial", url: "https://www.youtube.com/playlist?list=PLEbnTDxVgJOOYdXkOFgT8l3sMO1rU2a3p" }
        ]
      },
      {
        title: "Chapter 4: Code Generation",
        topics: [
          "Intermediate Code Generation - prefix, postfix notation",
          "Quadruple, triple, indirect triples Representation",
          "Syntax tree - Evaluation of expression",
          "Three-address code - Synthesized attributes",
          "Inherited attributes - Intermediate languages",
          "Declarations - Assignment Statements - Boolean Expressions",
          "Back patching - Procedure calls"
        ],
        importantTopics: ["Intermediate code generation", "Three-address code"],
        pdfs: [
          { name: "Code Generation Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/CS0301-Compiler%20Design(1).pdf" }
        ],
        videos: [
          { title: "Code Generation in Compilers", url: "https://www.youtube.com/playlist?list=PLEbnTDxVgJOOYdXkOFgT8l3sMO1rU2a3p" }
        ]
      },
      {
        title: "Chapter 5: Code Optimization",
        topics: [
          "Code optimization - Principal Sources of Optimization",
          "Function Preserving Transformation - Loop Optimization",
          "Peephole optimization - DAG - Basic Blocks",
          "Flow Graphs - Global Data Flow Analysis",
          "Efficient Data Flow Algorithm",
          "Runtime Environments - Source Language issues",
          "Storage Organization - Activation Records"
        ],
        importantTopics: ["Code optimization techniques", "Runtime environments"],
        pdfs: [
          { name: "Code Optimization Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/CS0301-Compiler%20Design(1).pdf" }
        ],
        videos: [
          { title: "Compiler Optimization", url: "https://www.youtube.com/playlist?list=PLEbnTDxVgJOOYdXkOFgT8l3sMO1rU2a3p" }
        ]
      }
    ]
  },
  {
    courseCode: "CS110-SE",
    name: "Software Engineering and Project Management",
    chapters: [
      {
        title: "Chapter 1: Introduction to Software Engineering",
        topics: [
          "Introduction to Software Engineering",
          "Software Process, Perspective and Specialized Process",
          "Software Engineering Models",
          "Introduction to Agility - Agile Process",
          "Extreme programming, SCRUM methodology",
          "Software Engineering Paradigms",
          "Software life cycle models"
        ],
        importantTopics: ["Software process models", "Agile methodologies"],
        pdfs: [
          { name: "Software Engineering Introduction", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/april_2016_curriculum_syllabus_swe_m.tech_2015_16.pdf" },
          { name: "SE Course Material", url: "https://srmap.edu.in/file/2021/08/CSE-2017-2021_Syllabus_Book-corrected-17-06-2021.pdf" }
        ],
        videos: [
          { title: "Software Engineering Full Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2" },
          { title: "SDLC Models Tutorial", url: "https://www.youtube.com/playlist?list=PLf7gX5WaG6yDfkCN5EiP1t1n-q9c0w-cq" }
        ]
      },
      {
        title: "Chapter 2: Requirements Analysis and Design",
        topics: [
          "Requirements Engineering Process",
          "Requirements Elicitation and Analysis",
          "Requirements Validation and Management",
          "System models and context models",
          "Design concepts - Abstraction, Architecture, patterns",
          "Separation of Concerns, Modularity, Information Hiding",
          "Functional Independence, Refinement"
        ],
        importantTopics: ["Requirements engineering", "Design principles"],
        pdfs: [
          { name: "Requirements Analysis Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/april_2016_curriculum_syllabus_swe_m.tech_2015_16.pdf" }
        ],
        videos: [
          { title: "Requirements Engineering", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2" }
        ]
      },
      {
        title: "Chapter 3: Software Design and Architecture",
        topics: [
          "Architectural Design - Architectural views",
          "Architectural patterns and styles",
          "Application architectures",
          "Object Oriented Design Concepts",
          "Design Classes - Design Model",
          "Data, Architectural, Interface, Component Design",
          "Deployment Level Design Elements"
        ],
        importantTopics: ["Software architecture", "Design patterns"],
        pdfs: [
          { name: "Software Design Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/april_2016_curriculum_syllabus_swe_m.tech_2015_16.pdf" }
        ],
        videos: [
          { title: "Software Architecture Tutorial", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2" }
        ]
      },
      {
        title: "Chapter 4: Software Testing",
        topics: [
          "Software Quality - Software Quality Dilemma",
          "Achieving Software Quality",
          "Testing - Strategic Approach to software Testing",
          "Testing Strategies for Conventional Software",
          "Object oriented software, Web Apps",
          "Validating Testing - System Testing",
          "Art of Debugging, Test case design"
        ],
        importantTopics: ["Software testing strategies", "Test case design"],
        pdfs: [
          { name: "Software Testing Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/april_2016_curriculum_syllabus_swe_m.tech_2015_16.pdf" }
        ],
        videos: [
          { title: "Software Testing Complete Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2" }
        ]
      },
      {
        title: "Chapter 5: Software Project Management",
        topics: [
          "Software Project Management concepts",
          "Software Maintenance - Software Supportability",
          "Reengineering - Business Process Reengineering",
          "Software Reengineering - Reverse Engineering",
          "Restructuring - Forward Engineering",
          "Economics of Reengineering",
          "Project planning and scheduling"
        ],
        importantTopics: ["Project management", "Software maintenance"],
        pdfs: [
          { name: "Software Project Management", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/april_2016_curriculum_syllabus_swe_m.tech_2015_16.pdf" }
        ],
        videos: [
          { title: "Software Project Management", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2" }
        ]
      }
    ]
  },
  {
    courseCode: "CS111-DIP",
    name: "Digital Image Processing",
    chapters: [
      {
        title: "Chapter 1: Fundamentals of Digital Image Processing",
        topics: [
          "Steps in Digital Image Processing - Components",
          "Elements of Visual Perception",
          "Image Sensing and Acquisition",
          "Image Sampling and Quantization",
          "Relationships between pixels",
          "Color image fundamentals - RGB, HSI models",
          "Two-dimensional mathematical preliminaries, 2D transforms - DFT, DCT"
        ],
        importantTopics: ["Image fundamentals", "Color models"],
        pdfs: [
          { name: "DIP Introduction Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/em2109_digital_image_processing_2013_14.pdf" },
          { name: "Digital Image Processing Course", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2017/15CS325E-lp2017.pdf" }
        ],
        videos: [
          { title: "Digital Image Processing Full Course", url: "https://www.youtube.com/playlist?list=PLuh62Q4Sv7BUf60vkjePfcOQc8sHxmnDX" },
          { title: "Image Processing Tutorial", url: "https://www.youtube.com/playlist?list=PLWw98q-Xe7iH8UHARl8RGk8MRj1raY8oN" }
        ]
      },
      {
        title: "Chapter 2: Image Enhancement",
        topics: [
          "Spatial Domain - Basic Gray level Transformations",
          "Histogram Processing - Smoothing spatial filters",
          "Sharpening spatial filters",
          "Frequency Domain - Smoothing frequency domain filters",
          "Sharpening frequency domain filters",
          "Homomorphic filtering",
          "Color image enhancement techniques"
        ],
        importantTopics: ["Image enhancement techniques", "Histogram processing"],
        pdfs: [
          { name: "Image Enhancement Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2017/15CS325E-lp2017.pdf" }
        ],
        videos: [
          { title: "Image Enhancement Tutorial", url: "https://www.youtube.com/playlist?list=PLuh62Q4Sv7BUf60vkjePfcOQc8sHxmnDX" }
        ]
      },
      {
        title: "Chapter 3: Image Restoration",
        topics: [
          "Introduction to Image Restoration - degradation model",
          "Properties, Noise models - Mean Filters",
          "Order Statistics - Adaptive filters",
          "Band reject Filters - Band pass Filters",
          "Notch Filters - Optimum Notch Filtering",
          "Inverse Filtering - Wiener filtering",
          "Motion blur and atmospheric turbulence"
        ],
        importantTopics: ["Image restoration techniques", "Noise filtering"],
        pdfs: [
          { name: "Image Restoration Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/em2109_digital_image_processing_2013_14.pdf" }
        ],
        videos: [
          { title: "Image Restoration Techniques", url: "https://www.youtube.com/playlist?list=PLuh62Q4Sv7BUf60vkjePfcOQc8sHxmnDX" }
        ]
      },
      {
        title: "Chapter 4: Image Segmentation",
        topics: [
          "Region of interest (ROI) selection",
          "Feature extraction - Histogram based features",
          "Intensity Features - Color, Shape Features",
          "Local Binary Patterns (LBP), Texture descriptors",
          "Grey Level Co-occurrence Matrix (GLCM)",
          "Fundamentals of Image Compression models",
          "Error Free Compression - Variable Length Coding"
        ],
        importantTopics: ["Image segmentation", "Feature extraction"],
        pdfs: [
          { name: "Image Segmentation Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/em2109_digital_image_processing_2013_14.pdf" }
        ],
        videos: [
          { title: "Image Segmentation Tutorial", url: "https://www.youtube.com/playlist?list=PLuh62Q4Sv7BUf60vkjePfcOQc8sHxmnDX" }
        ]
      },
      {
        title: "Chapter 5: Advanced Image Processing",
        topics: [
          "Extracting Interest Points and Their Descriptors",
          "Harris, SIFT and SURF in Image Pairs",
          "Principal Component Analysis (PCA)",
          "Linear Discriminant Analysis for Image Recognition",
          "Image Classification using SVM-ANN",
          "Feedforward and Back propagation",
          "Object Detection using CNN-RCNN"
        ],
        importantTopics: ["Feature detection", "Machine learning in image processing"],
        pdfs: [
          { name: "Advanced Image Processing", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/em2109_digital_image_processing_2013_14.pdf" }
        ],
        videos: [
          { title: "Computer Vision and ML", url: "https://www.youtube.com/playlist?list=PLuh62Q4Sv7BUf60vkjePfcOQc8sHxmnDX" }
        ]
      }
    ]
  },
  {
    courseCode: "MA111-DM",
    name: "Discrete Mathematics",
    chapters: [
      {
        title: "Chapter 1: Set Theory",
        topics: [
          "Sets - Operations on sets - Laws of set theory",
          "Partition of a set - Cartesian product of sets",
          "Relations - Properties - Equivalence relation and partial order relation",
          "Poset - Graphs of relations - Digraphs",
          "Hasse diagram - Closures of relations",
          "Transitive closure and Warshall's algorithm",
          "Functions - Types of functions - Composition of functions"
        ],
        importantTopics: ["Set operations", "Relations and functions"],
        pdfs: [
          { name: "Discrete Mathematics Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2018/15MA302-discrete-mathematics.pdf" },
          { name: "Set Theory Course Material", url: "https://webstor.srmist.edu.in/web_assets/downloads/2023/mathematics-syllabus-all-programmes-2021.pdf" }
        ],
        videos: [
          { title: "Discrete Mathematics Complete Course", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3" },
          { title: "Set Theory Tutorial", url: "https://www.youtube.com/playlist?list=PLDDGPdw7e6Ag1EIznZ-m-qXu4XX3A0cIz" }
        ]
      },
      {
        title: "Chapter 2: Combinatorics and Number Theory",
        topics: [
          "Permutation and combination - Addition and product rules",
          "Principle of inclusion and exclusion",
          "Pigeon-hole principle and generalized pigeon-hole principle",
          "Divisibility and prime numbers",
          "Fundamental theorem of arithmetic - Prime factorization",
          "Division algorithm - Greatest common divisor",
          "Properties - Euclid's algorithm - Least common multiple"
        ],
        importantTopics: ["Combinatorics", "Number theory fundamentals"],
        pdfs: [
          { name: "Combinatorics Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2018/15MA302-discrete-mathematics.pdf" }
        ],
        videos: [
          { title: "Combinatorics Tutorial", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3" }
        ]
      },
      {
        title: "Chapter 3: Mathematical Logic",
        topics: [
          "Propositions and logical operators - Truth tables",
          "Converse, inverse and contrapositive",
          "Tautology and contradiction - Equivalences - Implications",
          "Laws of logic - Inference theory",
          "Rules of inference - Direct method - CP rule",
          "Inconsistency - Indirect method",
          "Principle of mathematical induction"
        ],
        importantTopics: ["Propositional logic", "Mathematical proofs"],
        pdfs: [
          { name: "Mathematical Logic Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2018/15MA302-discrete-mathematics.pdf" }
        ],
        videos: [
          { title: "Mathematical Logic Tutorial", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3" }
        ]
      },
      {
        title: "Chapter 4: Graph Theory",
        topics: [
          "Graphs, Basic concepts and types of Graphs",
          "Paths and Circuits, Eulerian Circuits",
          "Hamiltonian Circuits, Matrix Representation of Graphs",
          "Planar Graphs, Trees - Definition, and Characterization of Trees",
          "Representation of Algebraic Expressions by Binary Trees",
          "Spanning Tree of a Graph, Shortest Path Problem",
          "Minimal Spanning Tree, Tree Searching"
        ],
        importantTopics: ["Graph theory fundamentals", "Trees and spanning trees"],
        pdfs: [
          { name: "Graph Theory Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2018/15MA302-discrete-mathematics.pdf" }
        ],
        videos: [
          { title: "Graph Theory Complete Course", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3" }
        ]
      },
      {
        title: "Chapter 5: Lattices and Boolean Algebra",
        topics: [
          "Lattices, properties of lattices",
          "Lattices as algebraic system, Sub-lattices",
          "Lattice Isomorphism, Bounded, Complemented and Distributive lattices",
          "Boolean Algebra - Definitions and Basic Properties",
          "Representation Theorem, Boolean Expressions",
          "Logic Gates and Circuits, Boolean Function",
          "Karnaugh map, Half-Adder, Full Adder"
        ],
        importantTopics: ["Boolean algebra", "Logic circuits"],
        pdfs: [
          { name: "Boolean Algebra Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2018/15MA302-discrete-mathematics.pdf" }
        ],
        videos: [
          { title: "Boolean Algebra Tutorial", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3" }
        ]
      }
    ]
  },
  {
    courseCode: "MA112-PS",
    name: "Probability and Statistics",
    chapters: [
      {
        title: "Chapter 1: Probability Theory",
        topics: [
          "Sample space and events, Probability axioms",
          "Conditional probability and independence",
          "Bayes' theorem and applications",
          "Random variables - discrete and continuous",
          "Probability distributions and density functions",
          "Mathematical expectation and variance",
          "Moment generating functions"
        ],
        importantTopics: ["Probability fundamentals", "Random variables"],
        pdfs: [
          { name: "Probability Theory Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/ma0461_probability_and_statistics.pdf" },
          { name: "Probability and Statistics Course", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2018/15MA301-probability-and-statistics.pdf" }
        ],
        videos: [
          { title: "Probability Complete Course", url: "https://www.youtube.com/playlist?list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN" },
          { title: "Probability Theory Tutorial", url: "https://www.youtube.com/playlist?list=PLvxOuBpazmsOGOursPoofaHyz_1NpxbhA" }
        ]
      },
      {
        title: "Chapter 2: Discrete Distributions",
        topics: [
          "Discrete distributions - Introduction",
          "Mean and variance of binomial distribution",
          "Fitting a binomial distribution",
          "MGF of binomial distribution",
          "Poisson distribution - Mean and Variance",
          "Geometric distribution",
          "Negative Binomial Distribution"
        ],
        importantTopics: ["Binomial distribution", "Poisson distribution"],
        pdfs: [
          { name: "Discrete Distributions", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/ma0461_probability_and_statistics.pdf" }
        ],
        videos: [
          { title: "Discrete Probability Distributions", url: "https://www.youtube.com/playlist?list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN" }
        ]
      },
      {
        title: "Chapter 3: Continuous Distributions",
        topics: [
          "Normal distribution and Properties",
          "Standard normal distribution",
          "Exponential distribution - Mean and Variance",
          "Memoryless Property and problems",
          "Uniform distribution",
          "Gamma and Beta distributions",
          "Chi-square, t and F distributions"
        ],
        importantTopics: ["Normal distribution", "Exponential distribution"],
        pdfs: [
          { name: "Continuous Distributions", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/ma0461_probability_and_statistics.pdf" }
        ],
        videos: [
          { title: "Continuous Probability Distributions", url: "https://www.youtube.com/playlist?list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN" }
        ]
      },
      {
        title: "Chapter 4: Hypothesis Testing",
        topics: [
          "Introduction to sampling distributions",
          "Population and sample, null hypothesis and alternative hypothesis",
          "Testing of hypothesis, level of significance, critical region",
          "Large sample test - test for single proportion, two proportions",
          "Large sample test - test for single mean, two means",
          "Small sample tests - 't' test for a single mean",
          "F test - Test of significance"
        ],
        importantTopics: ["Hypothesis testing", "Statistical tests"],
        pdfs: [
          { name: "Hypothesis Testing Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2018/15MA301-probability-and-statistics.pdf" }
        ],
        videos: [
          { title: "Hypothesis Testing Tutorial", url: "https://www.youtube.com/playlist?list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN" }
        ]
      },
      {
        title: "Chapter 5: Correlation and Regression",
        topics: [
          "Correlation and Properties",
          "Karl Pearson's correlation coefficient",
          "Rank correlation coefficient",
          "Linear Regression lines and Properties",
          "Regression coefficient, Problems",
          "Multiple correlation and regression",
          "Analysis of variance (ANOVA)"
        ],
        importantTopics: ["Correlation analysis", "Regression analysis"],
        pdfs: [
          { name: "Correlation and Regression", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/2018/15MA301-probability-and-statistics.pdf" }
        ],
        videos: [
          { title: "Correlation and Regression", url: "https://www.youtube.com/playlist?list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN" }
        ]
      }
    ]
  },
  {
    courseCode: "CS112-OOP",
    name: "Object Oriented Programming",
    chapters: [
      {
        title: "Chapter 1: Introduction to OOP",
        topics: [
          "Object-Oriented Programming - Features of C++",
          "I/O Operations, Data Types, Variables-Static, Constants",
          "Pointers-Type Conversions",
          "Conditional and looping statements - Arrays",
          "C++ 11 features - Class and Objects",
          "Abstraction and Encapsulation, Access Specifiers",
          "Methods- UML Diagrams Introduction"
        ],
        importantTopics: ["OOP concepts", "Classes and Objects"],
        pdfs: [
          { name: "OOP Introduction Notes", url: "https://webstor.srmist.edu.in/web_assets/srm_ramapuram/files/CS0255F-OOP(1).pdf" },
          { name: "Object Oriented Programming Course", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cs0255_object_oriented_programming.pdf" }
        ],
        videos: [
          { title: "Object Oriented Programming Full Course", url: "https://www.youtube.com/playlist?list=PLfVsf4Bjg79Cu5MYkyJ-u4SyQmMhFeC1C" },
          { title: "C++ OOP Tutorial", url: "https://www.youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb" }
        ]
      },
      {
        title: "Chapter 2: Methods and Polymorphism",
        topics: [
          "Constructors- Types of constructors",
          "Static constructor and Copy constructor -Destructor",
          "Polymorphism: Constructor overloading - Method Overloading",
          "Operator Overloading - UML Interaction Diagrams",
          "Sequence Diagram - Collaboration Diagram",
          "Function overloading concepts",
          "Method resolution and binding"
        ],
        importantTopics: ["Constructors and Destructors", "Operator Overloading"],
        pdfs: [
          { name: "Polymorphism in OOP", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cs0255_object_oriented_programming.pdf" }
        ],
        videos: [
          { title: "Polymorphism in C++", url: "https://www.youtube.com/playlist?list=PLfVsf4Bjg79Cu5MYkyJ-u4SyQmMhFeC1C" }
        ]
      },
      {
        title: "Chapter 3: Inheritance",
        topics: [
          "Inheritance - Types -Single and Multiple Inheritance",
          "Multilevel Inheritance - Hierarchical Inheritance",
          "Hybrid Inheritance - Advanced Functions",
          "Inline, Friend- Virtual - Pure Virtual function",
          "Abstract class - UML State Chart Diagram",
          "UML Activity Diagram",
          "Access control in inheritance"
        ],
        importantTopics: ["Inheritance types", "Virtual functions"],
        pdfs: [
          { name: "Inheritance in C++", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cs0255_object_oriented_programming.pdf" }
        ],
        videos: [
          { title: "Inheritance Tutorial", url: "https://www.youtube.com/playlist?list=PLfVsf4Bjg79Cu5MYkyJ-u4SyQmMhFeC1C" }
        ]
      },
      {
        title: "Chapter 4: Generic Programming",
        topics: [
          "Generic - Templates - Function templates",
          "Class Templates - Exceptional Handling",
          "try and catch - Multilevel exceptional",
          "throw and throws - finally - User defined exceptional",
          "Dynamic Modeling: Package Diagram",
          "UML Component Diagram - UML Deployment Diagram",
          "Template specialization and instantiation"
        ],
        importantTopics: ["Templates", "Exception handling"],
        pdfs: [
          { name: "Templates and Exception Handling", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cs0255_object_oriented_programming.pdf" }
        ],
        videos: [
          { title: "C++ Templates Tutorial", url: "https://www.youtube.com/playlist?list=PLfVsf4Bjg79Cu5MYkyJ-u4SyQmMhFeC1C" }
        ]
      },
      {
        title: "Chapter 5: Standard Template Library",
        topics: [
          "STL: Containers: Sequence and Associative Container",
          "Sequence Container: Vector, List, Deque, Array, Stack",
          "Associative Containers: Map, Multimap",
          "Iterator and Specialized iterator",
          "Functions of iterator - Algorithms",
          "find(), count(), sort() - Algorithms",
          "search(), merge(), for_each(), transform()"
        ],
        importantTopics: ["STL containers", "STL algorithms"],
        pdfs: [
          { name: "Standard Template Library", url: "https://webstor.srmist.edu.in/web_assets/srm_mainsite/files/downloads/cs0255_object_oriented_programming.pdf" }
        ],
        videos: [
          { title: "STL in C++", url: "https://www.youtube.com/playlist?list=PLfVsf4Bjg79Cu5MYkyJ-u4SyQmMhFeC1C" }
        ]
      }
    ]
  }
];