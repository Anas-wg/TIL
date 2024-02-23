## Stack, Queue, Dequeue

### Stack
- Last In first Out(박스쌓기)
- 입력이 1,2,3 이라면 출력은 3,2,1
- 연산
  - push(삽입)
  - pop(삭제)

### Queue
- First In First Out(줄서기)
- 한쪽에선 입력만(rear), 한쪽에선 출력만(Front) 진행
- 연산
  - Enqueue : 삽입
  - Dnqueue : 삭제
- 파이썬 같은 경우 collection 모듈에서 제공하는 deque 이용하면 편함

#### Collections-deque
1. append: 오른쪽서 데이터 삽입
2. appendleft: 왼쪽서 삽입
3. pop: 오른쪽서 데이터 삭제
4. popleft: 왼쪽서 데이터 삭제


### Dequeue(덱)
- 양쪽에서 삽입과 삭제가 가능한 구조
- 스택과 큐의 연산을 모두 지원
  - scroll : 입력은 한쪽서만, 출력은 양쪽에서 진행
  - sherif : 출력은 한쪽서만, 입력은 양쪽에서 진행