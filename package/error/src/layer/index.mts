// 参考：https://gist.github.com/mpppk/609d592f25cab9312654b39f1b357c60

/**
 * 独立したもしくは他のEntityを複合した値の型を定義するレイヤ
 *
 * 特定のドメイン単体で完結した処理はUseCaseではなくこの層に定義する。
 * また、処理の絡まない純粋なデータのキャストはこのレイヤで定義する（RustのFrom/Into traitのようなイメージ）。
 */
export class EntityLayerError extends Error {
  static {
    EntityLayerError.prototype.name = "EntityLayerError"
  }

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

/**
 * コントローラが求めるデータを生成するレイヤ
 *
 * 引数は必要最小限の定義にし、Entityにこだわらないこと
 *
 * 例）Presentation Component、Container Component、GraphQLのリゾルバー
 *
 * 基本的にはPresenterやControllerとは独立した実装にする。
 * しかし、Container ComponentのようにViewでありながら、Presenter、Controllerを内包する場合もある。
 * 最上位のコントローラが返却するデータ生成の範疇に収まっていれば、上記のような状態でもViewとする。
 */
export class ViewLayerError extends Error {
  static {
    ViewLayerError.prototype.name = "ViewLayerError"
  }

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

/**
 * Entity|Entities->Entity|Entities
 */
export class UseCaseLayerError extends Error {
  static {
    UseCaseLayerError.prototype.name = "UseCaseLayerError"
  }

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

/**
 * Controllerから渡されるEntityをViewに中継するレイヤ
 *
 * 定義は自体は分割されているが、基本的に特定のViewおよびContollerに対して密結合した実装となる。
 * 上記のドキュメントに従い、インターフェイスを実装し依存性を逆転、疎結合にすることも可能だが、コード量が著しく増加する可能性があるためコストを考えて実装する必要がある。
 *
 * また、フロントエンドの状態などはこのレイヤーで定義する。
 *
 * 例）カスタムフック、JotaiのAtom、GraphQLのdataloader（TODO：これは少し違うかも）
 */
export class PresenterLayerError extends Error {
  static {
    PresenterLayerError.prototype.name = "PresenterLayerError"
  }

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

/**
 * イベントに対して処理を行い必要であればViewを返却するレイヤ
 *
 * 以下のような流れでViewを返却する。
 *
 * Repository -> Entity -> Usecase (-> Repository | UseCase) -> Entity -> Presentation -> View
 *
 * コンテキスト（HTTPリクエスト、セッションなど）からデータ（any相当）を受け取る程度の処理に止め、それ以上はPresenterなどに処理を分割する。
 *
 * 例）Rest APIのエンドポイント、GraphQLのエンドポイント、Cronタスク
 */
export class ControllorLayerError extends Error {
  static {
    ControllorLayerError.prototype.name = "ControllorLayerError"
  }

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

/**
 * 外部に提供するインターフェイスを定義するレイヤ
 *
 * アプリケーションの形態（SPA、MPA、Web APIなど）によって必要なレイヤーが異なる可能性があるため、随時追加すること
 */
export type InterfaceAdapterLayerError =
  | ViewLayerError
  | PresenterLayerError
  | ControllorLayerError

/**
 * 外部API->Entityの変換を行うレイヤ
 *
 * UseCaseとInterfaceAdapterで実行する。
 * Web APIのようにアプリケーションとは完全に独立したものであればUseCase、クエリパラメータなどアプリケーションに依存したものであればInterfaceAdapterで実行することが望ましい。
 *
 * 例）DB、Web API、クエリパラメータ、Cookie、セッションなど
 */
export class RepositoryLayerError extends Error {
  static {
    RepositoryLayerError.prototype.name = "RepositoryLayerError"
  }

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}
