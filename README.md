# Version history

| Version     | Amendments  |Implementer |Created date|Reviewer    |
| ----------- | ----------- |----------- |----------- |----------- |
| 1.0         | Create      | Create     | 2024/08/15 |            |
|             |             |            |            |            |

# Table of content
<!-- TOC -->
- [Version history](#version-history)
- [Table of content](#table-of-content)
- [Title](#title)
  - [1. Introduction](#1-introduction)
  - [2. Key Concepts](#2-key-concepts)
    - [2.1: Tại sao lại cần RAGAS](#21-concept-1)
    - [2.2: RAGAS là gì](#22-concept-2)
  - [3. Implementation](#3-implementation)
  - [4. Conclusion](#4-conclusion)
  - [5. Additional Resources](#5-additional-resources)
  - [About the Author](#about-the-author)

<!-- /TOC -->

# RAGAS- Cách đánh giá một mô hình RAG

## 1. Introduction

RAG là viết tắt của Retrieval-Augmented Generation, dịch sang tiếng Việt có thể hiểu là mô hình tạo sinh tăng cường dựa trên kết quả truy xuất. Đây là một kỹ thuật tiên tiến trong lĩnh vực xử lý ngôn ngữ tự nhiên (NLP), kết hợp ưu điểm của các mô hình ngôn ngữ lớn (LLM) với hệ thống truy xuất thông tin.

## 2. Key Concepts

RAG được ứng dụng rất nhiều  trong các chatbot nội bộ, assitant  với rất nhiều  lợi điểm về độ chính xác,  dễ triển khai . Để đánh giá một câu trả lời của chatbot  thường là chủ quan theo quan điểm của từng người, có người gật gù chỉ xem trọng ý tưởng, có người yêu cầu không chỉ nội dung  mà cách hành văn cũng phải rõ ràng, không “lan man”, “lạc đề” hallucination ( rất dễ gặp trong các câu trả  lời của chatGPT, hay các mô hình LLM khác).

### 2.1: Tại sao lại cần RAGAS

Trong các dự án cụ thể, quan điểm __“nên sử dụng cái gì để đánh giá RAG ”__ có xu hướng bị bỏ qua . Bản thân việc đánh giá cũng có xu hướng bị bỏ qua. Tuy nhiên với các khách hàng "khó tính" yêu cầu cao ,cũng như bản thân chúng ta cũng __cần các chỉ số có thể  cân đo đong đếm được để đánh giá sự cải thiện câu trả lời khi tinh chỉnh mô hình, dữ liệu__, đó là lý do RAGAS ra đời.


### 2.2: RAGAS là gì

Là viết tắt của Retrieval Augmented Generation Assessment, Như chúng ta đã biết RAG gồm 2 phần Retrieval(truy vấn lấy ra các context chứa dữ liệu cần thiết để trả lời) và Generation(Sinh ra câu trả lời dựa trên dữ liệu + Prompt)	. 
https://docs.ragas.io/en/latest/concepts/metrics/index.html

## Các chỉ số đánh giá mô hình RAG bằng RAGAS 
Trước hết chúng ta cần 1 số định nghĩa
1.Context : Là các đoạn văn hay các chunk kết quả của quá trình truy vấn ( Retrieval)
2.Câu hỏi: là câu hỏi của người dùng
3.prompt: ở đây là system prompt ( để phân biệt với user prompt)
4.câu trả lời: Câu trả lời cuối cùng sinh ra bởi chatbot.

Các chỉ số đánh giá mô hình RAG bằng RAGAS 
|     Chỉ số                                                                 |     Đối tượng đánh giá    |     Mục đích                                                                                                                                                            |     Thông tin sử dụng để đánh   giá          |     Điểm số, cách xem                         |
|----------------------------------------------------------------------------|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|-----------------------------------------------|
|     Faithfulness     ( độ trung thưc)                                      |     Generation            |     Đánh giá xem câu trả lời   được tạo có thể được bắt nguồn từ context được tham chiếu hay không                                                                      |     Câu trả lời, context                     |     Từ 0 ～1     Càng cao mô hình càng tốt    |
|     Answer Relevancy (mức độ   liên quan)                                  |     Generation            |     Đánh giá mức độ liên quan   của câu trả lời được tạo ra với câu hỏi ban đầu                                                                                         |     Câu trả lời, câu hỏi ban   đầu           |     Từ 0 ～1     Càng cao mô hình càng tốt    |
|     Context Recall     ( độ tái hiện context)                              |     Retrieval             |     Đo lường mức độ liên quan   của context tham chiếu  với ground   truth                                                                                              |     Context, ground truth                    |     Từ 0 ～1     Càng cao mô hình càng tốt    |
|     Context Precision     (độ chính xác của   context)                     |     Retrieval             |     Đánh giá mức độ xếp hạng   của context có các yếu tố liên quan đến câu hỏi và  co được đánh thứ tự cao trong list các   context  tham chiếu hay không               |     câu hỏi ban đầu                          |     Từ 0 ～1     Càng cao mô hình càng tốt    |
|     Context entities recall     ( độ tái hiện thực thể   trong context)    |     Context               |      Thước đo về khả năng tái hiện context dựa   trên số lượng entities có mặt trong cả ground truth và context so với số lượng   entities chỉ có trong ground truth    |     Context, ground truth                    |     Từ 0 ～1     Càng cao mô hình càng tốt    |
|     Answer semantic   similarity      (độ tương đồng ngữ nghĩa)            |     Toàn bộ pipeline      |     đánh giá mức độ giống   nhau về mặt ngữ nghĩa giữa câu trả lời được tạo ra và ground truth                                                                          |     Câu trả lời, ground truth                |     Từ 0 ～1     Càng cao mô hình càng tốt    |
|     Answer Correctness     ( độ chính xác câu trả lời)                     |     Toàn bộ pipeline      |     Đo độ chính xác của      Câu trả lời và ground   truth                                                                                                              |     Câu trả lời, ground_truth                |     Từ 0 ～1     Càng cao mô hình càng tốt    |
|     Aspect Critique     (điểm phê bình)                                    |     Toàn bộ pipeline      |     đánh giá nội dung gửi dựa   trên các khía cạnh được xác định trước, chẳng hạn như tính không độc hại …                                                              |     Câu trả lời, điểm chuẩn   dc quy định    |                                               |
|     Summarization Score     ( điểm tóm tắt)                                |     Toàn bộ pipeline      |     thước đo mức độ tóm tắt nắm   bắt thông tin quan trọng từ ngữ cảnh bằng cách tóm tắt document,sau đó sinh   ra các câu hỏi và trả lời dựa trên nội dung tóm tắt     |     Câu trả lời                              |     Từ 0 ～1     Càng cao mô hình càng tốt    |

Thông thường người ta hay sử dụng __4 tiêu chí đầu tiên để đánh giá__ ,trong đó 3 tiêu chí 1. Faithfulnesss、2. Answer relevancy、3. Context precision  __không cần ground truth__ vẫn có thể tính toán ra được ( __cái này quan trọng vì không phải khi nào cũng có đủ effort để tạo ground truth__). Các chỉ số được __tính toán bằng cách thông qua LLM để parser câu trả lời để trích xuất content và entities hoặc embedding thành vector rồi tính toán__ theo các công thức, cụ thể có thể tham khảo ở  document và  source code https://github.com/explodinggradients/ragas/tree/main/src/ragas/metrics


## 3. Implementation

Chúng ta có thể dùng ragas thông qua langchain:

```python
from ragas.langchain.evalchain import RagasEvaluatorChain
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall,
)

# create evaluation chains
faithfulness_chain = RagasEvaluatorChain(metric=faithfulness)
answer_rel_chain = RagasEvaluatorChain(metric=answer_relevancy)
context_rel_chain = RagasEvaluatorChain(metric=context_precision)
context_recall_chain = RagasEvaluatorChain(metric=context_recall)

```
Đầu tiên ta tạo 1 QA chat bot theo mô hình RAG:
```python
from langchain_community.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI

loader = TextLoader("./nyc_wikipedia/nyc_text.txt")
index = VectorstoreIndexCreator().from_loaders([loader])


llm = ChatOpenAI(temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm,
    retriever=index.vectorstore.as_retriever(),
    return_source_documents=True,
)

```
Cuối cùng chúng ta lấy kết quả câu trả lời của QA chat bot trên và dùng hàm đã định nghĩa ở trên để tính ra chỉ số , ở đây là context_recall_chain 

```python
question = "How did New York City get its name?"
result = qa_chain({"query": question})
tính toán chỉ số
eval_result = context_recall_chain(result)

```
## 4. Conclusion

Azure Open AI và Azure AI Search cũng hỗ trợ tính toán chỉ số Ragas .
Chúng ta có thể lấy kết quả đánh giá của LLM mục tiêu bằng cách ghi lại System Prompt, câu hỏi và câu trả lời mong đợi (ground truth) cho LLM mục tiêu vào tệp Excel và tải nó lên hệ thống này để chạy batch.
Việc đánh giá sẽ được thực hiện trên mô-đun tạo (Azure Open AI) và mô-đun tìm kiếm (Azure AI Search). Mỗi mục được đánh giá với số điểm từ 0 đến 1.


![markdown](img/ragas.png)


## 5. Additional Resources

- [https://github.com/explodinggradients/ragas/tree/main/src/ragas/metrics]()
- [https://docs.ragas.io/en/latest/concepts/metrics/index.html]()


DataImpact tập trung vào ứng dụng những công nghệ mới nhất vào các bài toán cụ thể của khách hàng ở những điểm cốt lõi nhất. Điều đó mang lại những trải nghiệm rất phê với những anh em muốn tìm hiểu công nghệ học thật và làm thật, hãy join với chúng tôi để cùng khám phá nhé. https://dataimpact.vn/
