---
layout: archive
hero:
  waves: true
  button_url: "#about"
  button_label: "About"
author_profile: true
masthead_nav: connect_card_dropdown
title: 
redirect_from: /about/
last_modified_at: "2026-05-25"
date: "2026-05-25"
---

<!-- name pronounciation example? [▶️](https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg) -->

# About

👋 Hi, I’m Akash, an applied researcher/engineer with experience in speech, audio (at [Microsoft](https://www.microsoft.com/en-us/research/group/cognitive-services-research/speech/)), and most recently multi-modal document understanding and retrieval (at [Contextual AI](https://contextual.ai/)). This incidentally completes the trio of audio, vision & text AI multimodality. :)

> I'm currently on a sabbatical. After moving to the USA for grad school ~10 years ago, I decided to take a break to reflect, recharge and tinker before setting sail again. More on this here shortly!

<!-- A few things I've been upto:
- My US immigration petition which [IYKYK](https://writing.nikunjk.com/p/permanent-residency) is a project of its own
- Studying diffusion models, both continuous and discrete diffusion LMs
- Studying AIxbio by designing proteins shaped like the letters PROTEINS
- Attended [NAMM](https://www.namm.org/sites/default/files/2026-03/NAMM_2026-PostShowReport.pdf) (CES for Music Technology) in LA in Jan 2026, and deeply studied AIxmusic
 -->

# Work 

<details>
<summary>
<h2>Contextual AI</h2><h4>[2024-25]</h4>
<p>Wrangled millions of pages to land the first $ millions in enterprise contracts :) </p>
</summary>

<div markdown="1">
* Product development (0→1): RAG platform for knowledge agents
    * Built core [multimodal document understanding](https://contextual.ai/blog/document-parser-for-rag/) powering context ingestion for retrieval
    * Critical in landing company's first multi-million $ enterprise [contract with Qualcomm](https://contextual.ai/case-study/qualcomm)
* Applied research: Synthesis of long complex documents, eval design
    * Combining segmentation models, VLMs, and parsers for high-fidelity OCR with bbox provenance
    * Token-efficient synthesis of million+ token context via ingest-time compute (à la [llm-wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f))
    * [Demo: Chat with 250 page PDF in Cursor](https://www.linkedin.com/feed/update/urn:li:activity:7346595035770929152) | [Blog: Agentic alternative to GraphRAG](https://contextual.ai/blog/an-agentic-alternative-to-graphrag)
* SWE things: Workflow/agent framework architecture, testing, observability, and scalability
* Tech Lead Manager: DRI cross-company; Mentored team of 3, interviewed candidates
</div>
</details>


<details>
<summary>
<h2>Microsoft</h2><h4>[2018-23]</h4>
<p>Fun fact: ~6M hours of monthly traffic equals 1 *year* of conversations transcribed per hour! </p>
</summary>

<div markdown="1">
* Model development: state-of-art transcription designed for scale [X * 1e7 hrs/month]
    * Shipped both batch and streaming models to [Azure Batch](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/batch-transcription), [Microsoft Word](https://www.pcmag.com/how-to/save-time-with-microsoft-words-built-in-transcription-feature), and [Microsoft Teams](https://thenextweb.com/news/microsoft-teams-live-meeting-transcription-ai-zoom-video-conferencing)
    * Optimized Conformer batch model ([Whisper](https://github.com/openai/whisper)-comparable) at 50x realtime
* Applied research: diarized multi-speaker multi-mic transcription
    * Shipped diarized in-conference room transcription device covered by [The Verge](https://www.theverge.com/2021/3/2/22308962/microsoft-intelligent-speaker-teams-translation-transcription-features)
    * Lead contributor: ASR training recipes, evaluation metrics, cross-system error analysis
* Research engineering: data pipelines, optimizing distributed training and inference
    * Speeding up O(1e20) FLOP training on low-cost V100 GPUs
    * Leveraged NVIDIA/ONNX profiling tools to fix bottlenecks in inference throughput
* Other Links:
    * [US Patent US11044287B1: Network resilient real-time voice communication leveraging on-device speech models](https://patents.google.com/patent/US11044287B1/en)

'Graduated' as one of the few non-speech-PhD senior members on the team :)
</div>
</details>


# Misc 

<details>
<summary>
<h2>Open source</h2>
</summary>

<div markdown="1">
- [2023] 🐥🗣️ Contributed to [whisper.cpp](https://twitter.com/ggerganov/status/1676271637572853771) (50k+ stars). [tinydiarize](https://github.com/akashmjn/tinydiarize) is a lightweight extension of OpenAI's Whisper model for speaker diarization, runnable on MacBooks/iPhones.
- [2019-22] 🐋 Co-founded [OrcaHello](https://ai4orcas.net/orcahello/), a real-time alert system listening for endangered orca calls 24/7 at underwater "hydrophones" in the Pacific Northwest. Awarded a [$30k AI for Earth grant](https://wildlabs.net/funding-opportunity/ai-earth-innovation-grant-extended); [covered by Mongabay News](https://news.mongabay.com/2026/04/ai-tool-listens-for-endangered-orcas-in-real-time-to-reduce-human-disturbance/).
- [2018] 🗣️ Built [Attention, I'm Trying to Speak](https://github.com/akashmjn/cs224n-gpu-that-talks): speech synthesis with just $75 of compute. Got to [fist-bump Richard Socher](https://x.com/RichardSocher/status/976638195528904704?s=20) for [Stanford CS224n project award](https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1184/reports.html) :).
</div>
</details>


<details>
<summary>
<h2>Other</h2>
</summary>

<div markdown="1">
- [2025/26] Peer reviewer for ICASSP, TMLR, and NeurIPS, CVPR workshops.
- [2016/17] Wrote [case studies](/pdf/Spotify-MS&E270-Presentation.pdf) on the music streaming industry while studying business/tech strategy at Stanford [MS&E](https://poetsandquants.com/2025/07/28/the-secret-stanford-program-no-ones-heard-about/).
- [2014] Organized (at the time) [Chennai's largest EDM gig](https://whatsthescene.com/2013/12/chennais-largest-edm-gig-at-iit-madras-saarang/) - with 5k+ attendees, during my undergrad at IIT Madras/Chennai.
</div>
</details>

<!-- More items to add under Misc
- stanford tts project
- organized chennai's largest edm music feastival
- past life on nicotine manufacturing, halliburton, control systems engineering
-->

<!-- Don't hesitate to reach out at [akashmjn.1] [at] [gmail] [dot] [--] with any thoughts, collaborations, or opportunites! -->
