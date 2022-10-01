
# FP Learn

[Foundations of Functional Programming - Wikiversity](https://en.wikiversity.org/wiki/Foundations_of_Functional_Programming)

[Foundations of Functional Programming/The λ-cube - Wikiversity](https://en.wikiversity.org/wiki/Foundations_of_Functional_Programming/The_%CE%BB-cube)

Разобраться как это работает (интероп между Бифунктором BIO и MonadError

Context Bound

It shouldn’t be surprising that context bounds are implemented with implicit parameters, given their definition. Actually, the syntax I showed are syntactic sugars for what really happens. See below how they de-sugar:

```jsx
def g[A : B](a: A) = h(a)
def g[A](a: A)(implicit ev: B[A]) = h(a)

```

Not works

```jsx
def t[
F[+_,+_]: izumi.functional.bio.BIOPrimitives: izumi.functional.bio.BIO, 
R[_] : Sync : MonadError[Throwable, ?]]
(t: R[Int])(implicit s: MonadError[F[Throwable, ?], Throwable]): F[Throwable, Int]
 = s.pure(10/1)
```

Works

```jsx
import $plugin.$ivy.`org.typelevel:kind-projector_2.13.2:0.11.0`
import scala.concurrent.ExecutionContext.global
import doobie.util.ExecutionContexts
import izumi.functional._
import izumi.functional.bio._

~~i~~mport izumi.functional.bio.catz._
import cats._, cats.effect._, cats.implicits._
implicit val cs: ContextShift[IO]           = IO.contextShift(ExecutionContexts.synchronous)

def t[F[+_,+_]: izumi.functional.bio.BIOPrimitives: izumi.functional.bio.BIO : izumi.functional.bio.BIOApplicative, R[_] : Sync :MonadError[?[_], Throwable], B](t: R[B])(implicit s: MonadError[R, Throwable]): F[Throwable, Int] = MonadError[F[Throwable, ?], Throwable].pure(10 / 0)
t(IO(1/0))

def t[F[+_, +_]: BIOPrimitives: BIO, R[_]: Effect, B](t: R[B])(implicit cs: ContextShift[R]): F[Throwable, B] = {
  Concurrent[F[Throwable, ?]].liftIO(Effect[R].toIO(t))
}
```

[Welcome to Chimney's documentation! - Chimney 0.5.2 documentation](https://scalalandio.github.io/chimney/)

```jsx
Kai @neko-kai May 21 23:36
@Jacke If R[_] is a different type that isn't F[Throwable, ?], you could do it like this:

def t[F[+_, +_]: BIOAsync: BIOFork, R[_]: Effect, B](t: R[B]): F[Throwable, B] = {
  import izumi.functional.bio.catz._
  Concurrent[F[Throwable, ?]].liftIO(Effect[R].toIO(t))
}

t[zio.IO, cats.effect.IO, Int](cats.effect.IO(1))

def from[F[+_, +_]: BIOAsync: BIOFork, R[_]: Concurrent: ContextShift: Effect, B](t: F[_, B]): R[B] = {
  import izumi.functional.bio.catz._
  Effect[R].liftIO(Concurrent[F[Throwable, ?]].toIO(t))
}

def toCatsEffect[F[+_], R, A](zio: RIO[R, A])(implicit R: Runtime[R], F: LiftIO[F]): F[A] =
     F.liftIO(taskEffectInstance.toIO(zio))

toCatsEffect[cats.effect.IO, Any, Int](res14)

implicit class RichZIO[F[+_], R, A](val self: RIO[R, A])(implicit R: Runtime[R], F: LiftIO[F]) extends AnyVal {
def toCatsEffect[F[+_], R, A]: F[A] = F.liftIO(taskEffectInstance.toIO(self))
}
// WORKS

implicit class SmellyZI[F[+_, +_]: BIOAsync: BIOFork, R[_]: Effect, B](t: R[B]) {
  def t: F[Throwable, B] = {
    import izumi.functional.bio.catz._
    Concurrent[F[Throwable, ?]].liftIO(Effect[R].toIO(t))
  }
  }

implicit class SmellyCattyyy[F[+_], R, A](zio: ZIO[R, Throwable, A])(implicit R: Runtime[R], F: LiftIO[F]) {
    def toCatsEffect: F[A] =
        F.liftIO(taskEffectInstance.toIO(zio))
  }
```

[Jacke/milewski-ctfp-pdf](https://github.com/Jacke/milewski-ctfp-pdf)

[TheAlgorithms/Python](https://github.com/TheAlgorithms/Python)

[8.1 The Future of Machine Learning | Interpretable Machine Learning](https://christophm.github.io/interpretable-ml-book/the-future-of-machine-learning.html)

[Spread0x/zio-query](https://github.com/Spread0x/zio-query)

[Building a cool CLI with Decline for my ZIO App](https://medium.com/@pascal.mengelt/building-a-cool-cli-with-decline-for-my-zio-app-80e095b2899a)

[Building the Death Star with ZIO Stream](https://juliano-alves.com/2020/05/04/deathstar-zio-stream/?utm_campaign=ZIO%20News&utm_medium=email&utm_source=Revue%20newsletter)

[typelevel/cats-mtl](https://github.com/typelevel/cats-mtl/blob/master/core/src/main/scala/cats/mtl/instances/readert.scala)

[Dependency injection with Reader Monad in Scala](https://medium.com/rahasak/dependency-injection-with-reader-monad-in-scala-fe05b29e04dd)

[Scala-cats, compose Reader with ReaderT](https://stackoverflow.com/questions/55375125/scala-cats-compose-reader-with-readert)

[State of Loom](http://cr.openjdk.java.net/~rpressler/loom/loom/sol1_part1.html)

[Typelevel.scala | A comprehensive introduction to Cats-mtl](https://typelevel.org/blog/2018/10/06/intro-to-mtl.html)

[No More Orphans](https://blog.7mind.io/no-more-orphans.html)

[IO monad: which, why and how](https://kubuszok.com/2019/io-monad-which-why-and-how/)

[Handling monadic errors](https://miklos-martin.github.io/learn/fp/2017/09/28/handling-monadic-errors.html)

[https://gist.github.com/jackcviers/804b6d8d1b2ead210367a104a746fd00](https://gist.github.com/jackcviers/804b6d8d1b2ead210367a104a746fd00)

[ZIO & Cats Effect: удачный союз](https://habr.com/ru/company/oleg-bunin/blog/472386/)

[circe/circe](https://github.com/circe/circe/blob/d8c869733446545c2d54ffe632dfdccaa0bbe9ec/modules/generic-simple/src/main/scala/io/circe/generic/simple/util/macros/JsonCodecMacros.scala)

[Replacing Akka Actors with Cats Effect and FS2](https://vlovgr.github.io/actors-cats-effect-fs2/#1)

[Typelevel.scala | Tagless Final algebras and Streaming](https://typelevel.org/blog/2018/05/09/tagless-final-streaming.html)

[Cats Effect 3.0 Proposal · Issue #634 · typelevel/cats-effect](https://github.com/typelevel/cats-effect/issues/634)

[Cats Effect 3.0 Design Discussion · Issue #321 · typelevel/cats-effect](https://github.com/typelevel/cats-effect/issues/321)

[](https://typelevel.org/cats-mtl/lifting-classes.html)

[AWS Lambda layers](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html)

[typelevel/cats-mtl](https://github.com/typelevel/cats-mtl/blob/dd5602ee8f18d24e44974eb91a5bed77fee9a896/tests/src/test/scala/cats/mtl/tests/WriterTTests.scala)

[Cats: Law Testing](https://typelevel.org/cats/typeclasses/lawtesting.html)

[What does the `#` operator mean in Scala?](https://stackoverflow.com/questions/9443004/what-does-the-operator-mean-in-scala)

[herding cats - Checking laws with Discipline](http://eed3si9n.com/herding-cats/checking-laws-with-discipline.html)

[typelevel/discipline](https://github.com/typelevel/discipline/blob/master/core/src/test/scala/org/typelevel/discipline/laws.scala)

## Extended IOS

[Error management · Tofu](https://tinkoffcreditsystems.github.io/tofu/docs/errors)