# 第 9 章 如何接入外部 API

你也许没有积分，但是你有自己的LLM API，

WorkBuddy支持接入其他 LLM 的 API，以及 Coding Plan、Token Plan 等套餐。

直接从设置中进入，

![](/ai-qimeng/workbuddy-assets/bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/%E7%AC%AC%209%20%E7%AB%A0%20%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E5%A4%96%E9%83%A8%20API/assets/001_image_CaRmbk2N1o.png)

选择模型选项，

![](/ai-qimeng/workbuddy-assets/bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/%E7%AC%AC%209%20%E7%AB%A0%20%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E5%A4%96%E9%83%A8%20API/assets/002_image_PQxNb3id8o.png)

点击添加模型，

![](/ai-qimeng/workbuddy-assets/bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/%E7%AC%AC%209%20%E7%AB%A0%20%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E5%A4%96%E9%83%A8%20API/assets/003_image_De1fbH0Gho.png)

可以选择各种coding plan或者自定义的api

![](/ai-qimeng/workbuddy-assets/bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/%E7%AC%AC%209%20%E7%AB%A0%20%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E5%A4%96%E9%83%A8%20API/assets/004_image_Fa7pb60ARo.png)

比如，DeepSeek，你只需要输入api key即可，

![](/ai-qimeng/workbuddy-assets/bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/%E7%AC%AC%209%20%E7%AB%A0%20%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E5%A4%96%E9%83%A8%20API/assets/005_image_W9u5bNsaMo.png)

或者接入本地ollama模型，需先本地启动 Ollama（默认端口 11434，OpenAI 兼容接口），本地模型优势为数据不出本机、可离线、零 Token 成本。

![](/ai-qimeng/workbuddy-assets/bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/%E7%AC%AC%209%20%E7%AB%A0%20%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E5%A4%96%E9%83%A8%20API/assets/006_image_BSnBbYupuo.png)